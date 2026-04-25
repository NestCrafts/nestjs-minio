import { Inject } from '@nestjs/common';
import { getMinioConnectionToken } from './nest-minio.connection.providers';

export function InjectMinio(name?: string) {
	return Inject(getMinioConnectionToken(name));
}
