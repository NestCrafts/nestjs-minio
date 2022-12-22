import { NestMinioService } from './nest-minio.service';

export const MINIO_CONNECTION = 'MINIO_CONNECTION';

export const connectionFactory = {
  provide: MINIO_CONNECTION,
  useFactory: async (nestMinioService) => {
    return nestMinioService.getMinio();
  },
  inject: [NestMinioService],
};
