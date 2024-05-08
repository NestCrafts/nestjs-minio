import { Inject, Injectable, Logger } from '@nestjs/common';
import * as minio from 'minio';
import { MODULE_OPTIONS_TOKEN } from './nest-minio.module-definition';
import { NestMinioOptions } from './nest-minio.options';
import { from, lastValueFrom, retry } from "rxjs"

interface INestMinioService {
	getMinio(): minio.Client
}

@Injectable()
export class NestMinioService implements INestMinioService {
	private _minioConnection: minio.Client;

	private readonly logger = new Logger(NestMinioService.name);

	constructor(
		@Inject(MODULE_OPTIONS_TOKEN) private nestMinioOptions: NestMinioOptions,
	) { }

	getMinio(): minio.Client {
		if (!this._minioConnection) {
			const { retries, ...options } = this.nestMinioOptions;
			this._minioConnection = new minio.Client(options);
		}
		return this._minioConnection;
	}

	checkConnection() {
		const { retries = 5, retryDelay = 1000 } = this.nestMinioOptions

		lastValueFrom(from(this._minioConnection.listBuckets()).pipe(
			retry({ count: retries, delay: retryDelay })
		))
			.then(() => {
				this.logger.log("Successfully connected to minio.")
			})
			.catch(error => {
				this.logger.error(error)
			})
	}
}
