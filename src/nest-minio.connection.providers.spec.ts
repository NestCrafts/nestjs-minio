import { describe, expect, it } from '@jest/globals';
import {
	MINIO_CONNECTION,
	createConnectionProvider,
	getMinioConnectionToken,
} from './nest-minio.connection.providers';

describe('nest-minio.connection.providers', () => {
	it('should use default token when name is not provided', () => {
		expect(getMinioConnectionToken()).toBe(MINIO_CONNECTION);
	});

	it('should build named token when name is provided', () => {
		expect(getMinioConnectionToken('media')).toBe('MINIO_CONNECTION_media');
	});

	it('should create provider with named token', () => {
		const provider = createConnectionProvider('backup');
		expect(provider.provide).toBe('MINIO_CONNECTION_backup');
	});
});
