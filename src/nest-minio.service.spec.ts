import { describe, expect, it, jest } from '@jest/globals';
import { NestMinioService } from './nest-minio.service';

describe('NestMinioService', () => {
	it('should not throw when disconnect is called before initialization', async () => {
		const service = new NestMinioService({} as never);

		await expect(service.disconnect()).resolves.toBeUndefined();
	});

	it('should call close when client exposes close', async () => {
		const service = new NestMinioService({} as never);
		const close = jest.fn();
		(service as any)._minioConnection = { close };

		await service.disconnect();

		expect(close).toHaveBeenCalledTimes(1);
		expect((service as any)._minioConnection).toBeUndefined();
	});

	it('should fallback to destroy when close is unavailable', async () => {
		const service = new NestMinioService({} as never);
		const destroy = jest.fn();
		(service as any)._minioConnection = { destroy };

		await service.disconnect();

		expect(destroy).toHaveBeenCalledTimes(1);
		expect((service as any)._minioConnection).toBeUndefined();
	});

	it('should destroy transport agents when close and destroy are unavailable', async () => {
		const service = new NestMinioService({} as never);
		const transportDestroy = jest.fn();
		const anonymousTransportDestroy = jest.fn();
		(service as any)._minioConnection = {
			transportAgent: { destroy: transportDestroy },
			anonymousTransportAgent: { destroy: anonymousTransportDestroy },
		};

		await service.disconnect();

		expect(transportDestroy).toHaveBeenCalledTimes(1);
		expect(anonymousTransportDestroy).toHaveBeenCalledTimes(1);
		expect((service as any)._minioConnection).toBeUndefined();
	});

	it('should expose close and destroy aliases', async () => {
		const service = new NestMinioService({} as never);
		const disconnectSpy = jest.spyOn(service, 'disconnect').mockResolvedValue();

		await service.close();
		await service.destroy();

		expect(disconnectSpy).toHaveBeenCalledTimes(2);
	});
});
