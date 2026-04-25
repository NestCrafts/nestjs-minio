import { ClientOptions } from 'minio';

export type NestMinioOptions = ClientOptions & {
	name?: string;
	retries?: number;
	retryDelay?: number;
};
