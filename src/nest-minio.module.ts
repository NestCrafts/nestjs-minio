import { Module, DynamicModule, Provider, Global } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { NEST_MINIO_OPTIONS } from './constants';
import {
  NestMinioOptions,
  NestMinioAsyncOptions,
  NestMinioOptionsFactory,
} from './interfaces';
import { createNestMinioProviders } from './nest-minio.providers';
import { connectionFactory } from './nest-minio-connection.provider';

@Global()
@Module({
  providers: [NestMinioService, connectionFactory],
  exports: [NestMinioService, connectionFactory],
})
export class NestMinioModule {
  /**
   * Registers a configured NestMinio Module for import into the current module
   */
  public static register(options: NestMinioOptions): DynamicModule {
    return {
      module: NestMinioModule,
      providers: createNestMinioProviders(options),
    };
  }

  /**
   * Registers a configured NestMinio Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(options: NestMinioAsyncOptions): DynamicModule {
    return {
      module: NestMinioModule,
      providers: [...this.createProviders(options)],
      imports: options.imports || [],
    };
  }

  private static createProviders(options: NestMinioAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: NestMinioAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_MINIO_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: NEST_MINIO_OPTIONS,
      useFactory: async (optionsFactory: NestMinioOptionsFactory) =>
        await optionsFactory.createNestMinioOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
