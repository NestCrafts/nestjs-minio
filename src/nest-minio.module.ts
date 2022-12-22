
import { Module } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { ConfigurableModuleClass } from './nest-minio.module-definition';

@Module({
  providers: [NestMinioService],
  exports: [NestMinioService],
})
export class NestMinioModule extends ConfigurableModuleClass {}
