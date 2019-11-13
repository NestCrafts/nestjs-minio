import { NestMinioService } from './nest-minio.service';
export declare const connectionFactory: {
    provide: string;
    useFactory: (nestMinioService: any) => Promise<any>;
    inject: (typeof NestMinioService)[];
};
