import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { Server } from 'http';
import { ApplicationModule } from "../src/app.module";

describe('MinioModule', () => {
  let server: Server;
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
    }).compile();

    app = module.createNestApplication();
    server = app.getHttpServer();
    await app.init();
  });

  it(`should return all buckets`, () => {
    return request(server)
      .get('/app/buckets')
      .expect(200);
  });

  afterEach(async () => {
    await app.close();
  });
});
