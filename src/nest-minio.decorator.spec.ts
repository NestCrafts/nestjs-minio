import { describe, expect, it } from '@jest/globals';
import { SELF_DECLARED_DEPS_METADATA } from '@nestjs/common/constants';
import { InjectMinio } from './nest-minio.decorator';

class DefaultClientConsumer {
	constructor(@InjectMinio() readonly minioClient: unknown) {}
}

class NamedClientConsumer {
	constructor(@InjectMinio('archive') readonly minioClient: unknown) {}
}

describe('InjectMinio', () => {
	it('should use default token without name', () => {
		const deps = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, DefaultClientConsumer) ?? [];
		expect(deps[0]?.param).toBe('MINIO_CONNECTION');
	});

	it('should use named token when name is provided', () => {
		const deps = Reflect.getMetadata(SELF_DECLARED_DEPS_METADATA, NamedClientConsumer) ?? [];
		expect(deps[0]?.param).toBe('MINIO_CONNECTION_archive');
	});
});
