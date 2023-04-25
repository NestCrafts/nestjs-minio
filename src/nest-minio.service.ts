import { Inject, Injectable, Logger } from '@nestjs/common';
import * as minio from 'minio';
import { MODULE_OPTIONS_TOKEN } from './nest-minio.module-definition';
import { NestMinioOptions } from './nest-minio.options';

interface INestMinioService {
	getMinio(): minio.Client
}

@Injectable()
export class NestMinioService implements INestMinioService {
	private _minioConnection: minio.Client;

	private readonly logger = new Logger(NestMinioService.name);

	constructor(
		@Inject(MODULE_OPTIONS_TOKEN) private _NestMinioOptions: NestMinioOptions,
	) {}

	getMinio(): minio.Client {
		if (!this._minioConnection) {
			this._minioConnection = new minio.Client(this._NestMinioOptions);
		}
		return this._minioConnection;
	}

	checkConnection(){
		this._minioConnection.listBuckets().then(()=>{
			this.logger.log("Successfullly connected to minio.")
		})
		.catch(error =>{
			this.logger.error(error)
		})
	}
}
