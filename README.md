<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="http://kamilmysliwiec.com/public/nest-logo.png#1" alt="Nest Logo" />   </a>
  <a href="https://min.io" target="_blank"><img src="https://min.io/resources/img/logo.svg" width="380"></a>
</p>

<p align="center">Minio Module for Nest framework</p>

<p align="center">
<a href="https://www.npmjs.com/package/nestjs-minio"><img src="https://img.shields.io/npm/v/nestjs-minio" alt="NPM Version" /></a>
<a href="https://img.shields.io/npm/l/nestjs-minio"><img src="https://img.shields.io/npm/l/nestjs-minio" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/nestjs-minio"><img src="https://img.shields.io/npm/dw/nestjs-minio" alt="NPM Downloads" /></a>

</p>


<p align="center">
<a href="https://www.buymeacoffee.com/XbgWxt567" target="_blank"><img src="https://i.imgur.com/CahshSS.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>

</p>


## Description
This's a [nest-minio](https://github.com/rubiin/nest-minio) module for [Nest](https://github.com/nestjs/nest).
This quickstart guide will show you how to install the client SDK and execute an example JavaScript program. For a complete list of APIs and examples, please take a look at the [JavaScript Client API Reference](https://docs.min.io/docs/javascript-client-api-reference) documentation.

This document assumes that you have a working [nodejs](http://nodejs.org/) setup in place.


## Installation

```bash
$ npm i --save nestjs-minio
```


## Initialize MinIO Client

You need five items in order to connect to MinIO object storage server.


| Params     | Description |
| :------- | :------------ |
| endPoint	 | URL to object storage service. |
|port| TCP/IP port number. This input is optional. Default value set to ``80`` for HTTP and ``443`` for HTTPs.|
| accessKey | Access key is like user ID that uniquely identifies your account.   |
| secretKey	| Secret key is the password to your account.    |
|useSSL |Set this value to 'true' to enable secure (HTTPS) access |

Provide the credentials for minio module by importing it as :

```javascript
import { Module } from '@nestjs/common';
import { NestMinioClientController } from './nest-minio-client.controller';
import { NestMinioModule } from '../nest-minio.module';

@Module({
  controllers: [NestMinioClientController],
  imports: [
    NestMinioModule.register(
      isGlobal: true,
      {
      endPoint: 'play.min.io',
      port: 9000,
      useSSL: true,
      accessKey: 'Q3AM3UQ867SPQQA43P2F',
      secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    }),
  ],
})
export class NestMinioClientModule {}

```
Then you can use it in the controller or service by injecting it in the controller as:

```javascript

 constructor(@Inject(MINIO_CONNECTION) private readonly minioClient) {}

```

## Quick Start Example - File Uploader
This example program connects to an object storage server, makes a bucket on the server and then uploads a file to the bucket.

We will use the MinIO server running at https://play.min.io in this example. Feel free to use this service for testing and development. Access credentials shown in this example are open to the public.

```js

import { Controller, Get, Inject } from '@nestjs/common';
import { MINIO_CONNECTION } from '../constants';
import {Client, InjectMinio} from 'minio';

@Controller()
export class NestMinioClientController {
 // use inject token
  constructor(@Inject(MINIO_CONNECTION) private readonly minioClient: Client) {}

  // or use inject decorator
  // constructor(@InjectMinio() private readonly minioClient: Client) {}

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


```
