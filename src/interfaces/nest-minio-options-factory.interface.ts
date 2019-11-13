import { NestMinioOptions } from './nest-minio-options.interface';

export interface NestMinioOptionsFactory {
  createNestMinioOptions(): Promise<NestMinioOptions> | NestMinioOptions;
}
