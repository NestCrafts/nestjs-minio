import { MINIO_CONNECTION } from './constants';
import { NestMinioService } from './nest-minio.service';

export const connectionFactory = {
  provide: MINIO_CONNECTION,
  useFactory: async (nestMinioService) => {
    return nestMinioService.getMinio();
  },
  inject: [NestMinioService],
};
