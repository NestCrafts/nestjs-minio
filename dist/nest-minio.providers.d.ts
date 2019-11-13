import { NestMinioOptions } from './interfaces';
export declare function createNestMinioProviders(options: NestMinioOptions): {
    provide: string;
    useValue: NestMinioOptions;
}[];
