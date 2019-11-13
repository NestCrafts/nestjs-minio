/**
 *  NestMinioClientController is a testing controller that verifies that
 *  NestMinioModule was generated properly.
 *
 *  You can quickly verify this by running `npm run start:dev`, and then
 *  connecting to `http://localhost:3000` with your browser.  It should return
 *  a custom message like `Hello from NestMinioModule`.
 *
 *  Once you begin customizing NestMinioModule, you'll probably want
 *  to delete this controller.
 */
import { Controller, Get, Inject } from '@nestjs/common';
import { MINIO_CONNECTION } from '../constants';

@Controller()
export class NestMinioClientController {
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}

  @Get()
  index() {
    const file = '/tmp/app.zip';

    const metaData = {
      'Content-Type': 'application/octet-stream',
      'X-Amz-Meta-Testing': 1234,
      example: 5678,
    };
    // Using fPutObject API upload your file to the bucket europetrip.
    this.minioClient.fPutObject(
      'europetripxxx3',
      'app.zip',
      file,
      metaData,
      function(err, etag) {
        if (err) {
          return console.log(err);
        }
        console.log('File uploaded successfully.');
      },
    );
  }
}
