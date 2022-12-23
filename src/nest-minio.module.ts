import { Module } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { ConfigurableModuleClass } from './nest-minio.module-definition';
import { connectionFactory } from './nest-minio.connection.providers';

@Module({
	providers: [NestMinioService, connectionFactory],
	exports: [NestMinioService, connectionFactory],
})
export class NestMinioModule extends ConfigurableModuleClass {}
