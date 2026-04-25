import { NestMinioService } from './nest-minio.service';

export const MINIO_CONNECTION = 'MINIO_CONNECTION';

export function getMinioConnectionToken(name?: string): string {
	if (!name) {
		return MINIO_CONNECTION;
	}

	return `${MINIO_CONNECTION}_${name}`;
}

export function createConnectionProvider(name?: string) {
	return {
		provide: getMinioConnectionToken(name),
		useFactory: async (nestMinioService: { getMinio: () => any }) => {
			return nestMinioService.getMinio();
		},
		inject: [NestMinioService],
	};
}
