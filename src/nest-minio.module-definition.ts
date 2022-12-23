import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestMinioOptions } from './nest-minio.options';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
	new ConfigurableModuleBuilder<NestMinioOptions>()
		.setExtras(
			{
				isGlobal: true,
			},
			(definition, extras) => ({
				...definition,
				global: extras.isGlobal,
			}),
		)
		.build();
