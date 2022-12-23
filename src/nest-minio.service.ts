import { Injectable, Inject, Logger } from '@nestjs/common';
import { NestMinioOptions } from './nest-minio.options';
import * as Minio from 'minio';
import { MODULE_OPTIONS_TOKEN } from './nest-minio.module-definition';

interface INestMinioService {
	getMinio();
}

@Injectable()
export class NestMinioService implements INestMinioService {
	private _minioConnection: any;
	constructor(
		@Inject(MODULE_OPTIONS_TOKEN) private _NestMinioOptions: NestMinioOptions,
	) {}

	getMinio(): Minio.Client {
		if (!this._minioConnection) {
			this._minioConnection = new Minio.Client(this._NestMinioOptions);
		}
		return this._minioConnection;
	}
}
