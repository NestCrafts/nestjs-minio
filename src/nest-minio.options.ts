import { ClientOptions } from 'minio';

export type NestMinioOptions = ClientOptions & {
	retries?: number
	retryDelay?: number
};
