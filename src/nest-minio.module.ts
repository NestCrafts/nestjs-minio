import { Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { ConfigurableModuleClass } from './nest-minio.module-definition';
import { connectionFactory } from './nest-minio.connection.providers';

@Module({
	providers: [NestMinioService, connectionFactory],
	exports: [NestMinioService, connectionFactory],
})
export class NestMinioModule
	extends ConfigurableModuleClass
	implements OnModuleInit, OnApplicationShutdown
{
	constructor(readonly service: NestMinioService) {
		super();
	}
	async onModuleInit(): Promise<void> {
		await this.service.checkConnection();
	}

	async onApplicationShutdown(): Promise<void> {
		await this.service.disconnect();
	}
}
