import { Module } from '@nestjs/common';
import { NestMinioModule } from "../../src";
import { AppController } from "./app.controller";

@Module({
  imports: [
    NestMinioModule.register(
      {
      endPoint: 'localhost',
      port: 9000,
      useSSL: true,
      accessKey: 'test',
      secretKey: 'test1234',
    }),
  ],
  controllers: [AppController],
})
export class ApplicationModule {}
