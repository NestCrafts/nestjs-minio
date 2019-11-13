import { NestMinioOptions } from './interfaces';
interface INestMinioService {
    getMinio(): any;
}
export declare class NestMinioService implements INestMinioService {
    private _NestMinioOptions;
    private readonly logger;
    private _minioConnection;
    constructor(_NestMinioOptions: NestMinioOptions);
    getMinio(): any;
}
export {};
