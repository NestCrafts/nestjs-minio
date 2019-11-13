import { DynamicModule } from '@nestjs/common';
import { NestMinioOptions, NestMinioAsyncOptions } from './interfaces';
export declare class NestMinioModule {
    /**
     * Registers a configured NestMinio Module for import into the current module
     */
    static register(options: NestMinioOptions): DynamicModule;
    /**
     * Registers a configured NestMinio Module for import into the current module
     * using dynamic options (factory, etc)
     */
    static registerAsync(options: NestMinioAsyncOptions): DynamicModule;
    private static createProviders;
    private static createOptionsProvider;
}
