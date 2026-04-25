import { Inject, Injectable, Logger } from '@nestjs/common';
import {Client} from 'minio';
import { MODULE_OPTIONS_TOKEN } from './nest-minio.module-definition';
import { NestMinioOptions } from './nest-minio.options';
import { from, lastValueFrom, retry } from 'rxjs';

interface INestMinioService {
	getMinio(): Client;
	close(): Promise<void>;
	destroy(): Promise<void>;
	disconnect(): Promise<void>;
}

@Injectable()
export class NestMinioService implements INestMinioService {
	private _minioConnection: Client | undefined;

	private readonly logger = new Logger(NestMinioService.name);

	constructor(@Inject(MODULE_OPTIONS_TOKEN) private nestMinioOptions: NestMinioOptions) {}

	getMinio(): Client {
		if (!this._minioConnection) {
			const options = this.nestMinioOptions;
			this._minioConnection = new Client(options);
		}
		return this._minioConnection;
	}

	async checkConnection(): Promise<void> {
		const { retries = 5, retryDelay = 1000 } = this.nestMinioOptions;

		await lastValueFrom(
			from(this._minioConnection!.listBuckets()).pipe(retry({ count: retries, delay: retryDelay })),
		);

		this.logger.log('Successfully connected to minio.');
	}

	async disconnect(): Promise<void> {
		if (!this._minioConnection) {
			return;
		}

		const client = this._minioConnection as Client & {
			close?: () => unknown;
			destroy?: () => unknown;
			transportAgent?: { destroy?: () => unknown };
			anonymousTransportAgent?: { destroy?: () => unknown };
		};

		try {
			if (typeof client.close === 'function') {
				client.close();
			} else if (typeof client.destroy === 'function') {
				client.destroy();
			} else {
				client.transportAgent?.destroy?.();
				client.anonymousTransportAgent?.destroy?.();
			}

			this.logger.log('Disconnected minio client.');
		} finally {
			this._minioConnection = undefined;
		}
	}

	async close(): Promise<void> {
		await this.disconnect();
	}

	async destroy(): Promise<void> {
		await this.disconnect();
	}
}
