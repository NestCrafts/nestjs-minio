/**
 *  If you're building a standalone npm package hosting a dynamic module, you
 *  should delete this file.  Its only purpose is to bootstrap the app so that
 *  you can run the quick verification test (see nest-minio-client/nest-minio-client.module.ts)
 */
import { NestFactory } from '@nestjs/core';
import { NestMinioClientModule } from './nest-minio-client/nest-minio-client.module';

async function bootstrap() {
  const app = await NestFactory.create(NestMinioClientModule);
  await app.listen(3000);
}
bootstrap();
