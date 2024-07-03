import { Injectable } from '@nestjs/common';
import { ConfigData, ConfigDatabase, ConfigSwagger } from './config.interface';
import { DEFAULT_CONFIG } from './config.default';

@Injectable()
export class ConfigService {
	private config: ConfigData;

	constructor(data: ConfigData = DEFAULT_CONFIG) {
		this.config = data;
	}

	public loadFromEnv() {
		this.config = this.parseConfigFromEnv(process.env);
	}

	public get(): Readonly<ConfigData> {
		return this.config;
	}

	private parseConfigFromEnv(env: NodeJS.ProcessEnv): ConfigData {
		return {
			env: env.NODE_ENV || DEFAULT_CONFIG.env,
			port: parseInt(env.PORT, 10),
			db: this.parseDBConfig(env, DEFAULT_CONFIG.db),
			swagger: this.parseSwaggerConfig(env, DEFAULT_CONFIG.swagger),
			logLevel: env.LOG_LEVEL,
			email: {
				service_name: env.EMAIL_SERVICE_NAME || '',
				username: env.EMAIL_USERNAME || '',
				password: env.EMAIL_PASSWORD || '',
			},
			externalApi: {
				apiKey: env.PLATFORM_API_KEY || '',
				apiUrl: env.PLATFORM_API_URL || '',
			},
		};
	}

	private parseDBConfig(
		env: NodeJS.ProcessEnv,
		defaultConfig: Readonly<ConfigDatabase>,
	) {
		return {
			url: env.DATABASE_URL || defaultConfig.url,
		};
	}

	private parseSwaggerConfig(
		env: NodeJS.ProcessEnv,
		defaultConfig: Readonly<ConfigSwagger>,
	) {
		return {
			username: env.SWAGGER_USERNAME || defaultConfig.username,
			password: env.SWAGGER_PASSWORD || defaultConfig.password,
		};
	}
}
