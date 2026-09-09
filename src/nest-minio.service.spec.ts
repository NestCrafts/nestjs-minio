import { describe, expect, it, vi } from 'vitest';
import { NestMinioService } from './nest-minio.service';

describe('NestMinioService', () => {
  it('should not throw when disconnect is called before initialization', async () => {
    const service = new NestMinioService({} as never);

    await expect(service.disconnect()).resolves.toBeUndefined();
  });

  it('should call close when client exposes close', async () => {
    const service = new NestMinioService({} as never);
    const close = vi.fn();
    (service as any)._minioConnection = { close };

    await service.disconnect();

    expect(close).toHaveBeenCalledTimes(1);
    expect((service as any)._minioConnection).toBeUndefined();
  });

  it('should fallback to destroy when close is unavailable', async () => {
    const service = new NestMinioService({} as never);
    const destroy = vi.fn();
    (service as any)._minioConnection = { destroy };

    await service.disconnect();

    expect(destroy).toHaveBeenCalledTimes(1);
    expect((service as any)._minioConnection).toBeUndefined();
  });

  it('should destroy transport agents when close and destroy are unavailable', async () => {
    const service = new NestMinioService({} as never);
    const transportDestroy = vi.fn();
    const anonymousTransportDestroy = vi.fn();
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
    const disconnectSpy = vi.spyOn(service, 'disconnect').mockResolvedValue();

    await service.close();
    await service.destroy();

    expect(disconnectSpy).toHaveBeenCalledTimes(2);
  });

  it('should retry checkConnection with fresh listBuckets calls', async () => {
    const service = new NestMinioService({ retries: 2, retryDelay: 0 } as never);
    const listBuckets = vi
      .fn<() => Promise<unknown[]>>()
      .mockRejectedValueOnce(new Error('first'))
      .mockRejectedValueOnce(new Error('second'))
      .mockResolvedValueOnce([]);
    vi.spyOn(service, 'getMinio').mockReturnValue({ listBuckets } as any);

    await expect(service.checkConnection()).resolves.toBeUndefined();
    expect(listBuckets).toHaveBeenCalledTimes(3);
  });
});
