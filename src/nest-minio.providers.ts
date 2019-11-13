import { NestMinioOptions } from './interfaces';

import { NEST_MINIO_OPTIONS } from './constants';

export function createNestMinioProviders(options: NestMinioOptions) {
  return [
    {
      provide: NEST_MINIO_OPTIONS,
      useValue: options,
    },
  ];
}
