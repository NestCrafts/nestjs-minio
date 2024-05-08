import { Controller, Get } from '@nestjs/common';
import { InjectMinio } from "../../src";
import { Client } from "minio";

@Controller("app")
export class AppController {
   constructor(@InjectMinio() private readonly minioClient: Client) {}

  @Get("buckets")
  async getAll(){
    return this.minioClient.listBuckets()
  }
}
