import { Inject, Injectable } from '@nestjs/common';
import * as minio from 'minio';
import { MODULE_OPTIONS_TOKEN } from './nest-minio.module-definition';
import { NestMinioOptions } from './nest-minio.options';

interface INestMinioService {
	getMinio();
}

@Injectable()
export class NestMinioService implements INestMinioService {
	private _minioConnection: minio.Client;
	constructor(
		@Inject(MODULE_OPTIONS_TOKEN) private _NestMinioOptions: NestMinioOptions,
	) {}

	getMinio(): minio.Client {
		if (!this._minioConnection) {
			this._minioConnection = new minio.Client(this._NestMinioOptions);
		}
		return this._minioConnection;
	}
}
