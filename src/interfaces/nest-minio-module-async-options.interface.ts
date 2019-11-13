/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

/* Interfaces */
import { NestMinioOptions } from './nest-minio-options.interface';
import { NestMinioOptionsFactory } from './nest-minio-options-factory.interface';

export interface NestMinioAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<NestMinioOptionsFactory>;
  useClass?: Type<NestMinioOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<NestMinioOptions> | NestMinioOptions;
}
