import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { Server } from 'http';
import { MINIO_CONNECTION, NestMinioService } from '../../src';
import { ApplicationModule } from '../src/app.module';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

/**
 * Stubs the MinIO client so the suite exercises DI wiring and the HTTP route
 * without depending on a live MinIO server. `docker-compose.yml` remains the
 * way to run against a real instance manually.
 */
function createMinioClientStub() {
  return {
    listBuckets: vi.fn().mockResolvedValue([{ name: 'test-bucket', creationDate: new Date() }]),
  };
}

describe('MinioModule', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    })
      .overrideProvider(MINIO_CONNECTION)
      .useFactory(createMinioClientStub)
      .overrideProvider(NestMinioService)
      .useValue({
        getMinio: createMinioClientStub,
        checkConnection: vi.fn().mockResolvedValue(undefined),
        disconnect: vi.fn().mockResolvedValue(undefined),
      })
      .compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it(`should return all buckets`, async () => {
    const response = await request(server).get('/app/buckets').expect(200);

    expect(response.body).toEqual([{ name: 'test-bucket', creationDate: expect.any(String) }]);
  });

  afterEach(async () => {
    await app.close();
  });
});