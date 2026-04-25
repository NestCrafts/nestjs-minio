import { DynamicModule, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { NestMinioService } from './nest-minio.service';
import { ConfigurableModuleClass } from './nest-minio.module-definition';
import { createConnectionProvider } from './nest-minio.connection.providers';
import { NestMinioOptions } from './nest-minio.options';

@Module({
	providers: [NestMinioService],
	exports: [NestMinioService],
})
export class NestMinioModule
	extends ConfigurableModuleClass
	implements OnModuleInit, OnApplicationShutdown
{
	static register(options: NestMinioOptions): DynamicModule {
		const dynamicModule = super.register(options);
		const connectionProvider = createConnectionProvider(options.name);

		return {
			...dynamicModule,
			providers: [...(dynamicModule.providers ?? []), connectionProvider],
			exports: [...(dynamicModule.exports ?? []), connectionProvider],
		};
	}

	static registerAsync(options: any): DynamicModule {
		const dynamicModule = super.registerAsync(options);
		const connectionProvider = createConnectionProvider(options?.name);

		return {
			...dynamicModule,
			providers: [...(dynamicModule.providers ?? []), connectionProvider],
			exports: [...(dynamicModule.exports ?? []), connectionProvider],
		};
	}

	constructor(readonly service: NestMinioService) {
		super();
	}
	async onModuleInit(): Promise<void> {
		await this.service.checkConnection();
	}

	async onApplicationShutdown(): Promise<void> {
		await this.service.disconnect();
	}
}
