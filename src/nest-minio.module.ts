import { Module, OnModuleInit } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { ConfigurableModuleClass } from './nest-minio.module-definition';
import { connectionFactory } from './nest-minio.connection.providers';

@Module({
	providers: [NestMinioService, connectionFactory],
	exports: [NestMinioService, connectionFactory],
})
export class NestMinioModule extends ConfigurableModuleClass implements OnModuleInit {
	constructor(readonly service: NestMinioService){
		super();
	}
	onModuleInit() {
		this.service.checkConnection()
	}
}
