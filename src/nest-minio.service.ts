// tslint:disable: variable-name
import { Injectable, Inject, Logger } from '@nestjs/common';
import { NEST_MINIO_OPTIONS } from './constants';
import { NestMinioOptions } from './interfaces';
import * as Minio from 'minio';

interface INestMinioService {
  getMinio();
}

@Injectable()
export class NestMinioService implements INestMinioService {
  private readonly logger: Logger;
  private _minioConnection: any;
  constructor(
    @Inject(NEST_MINIO_OPTIONS) private _NestMinioOptions: NestMinioOptions,
  ) {
    this.logger = new Logger('NestMinioService');
    // this.logger.log(`Options: ${JSON.stringify(this._NestMinioOptions)}`);
  }

  getMinio() {
    if (!this._minioConnection) {
      this._minioConnection = new Minio.Client(this._NestMinioOptions);
    }
    return this._minioConnection;
  }
}
