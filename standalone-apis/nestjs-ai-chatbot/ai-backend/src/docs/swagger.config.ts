/**
 * Specifies configuration for the swagger UI (found at /api)
 */
export interface ISwaggerConfig {
	title: string;
	description: string;
	version: string;
	tags: string[];
}

/**
 * Configuration for the swagger UI
 */
export const SWAGGER_CONFIG: ISwaggerConfig = {
	title: 'open ai backend',
	description: ' api specs',
	version: '1.0',
	tags: [],
};

/**
 * Swagger Environments
 */
export const SWAGGER_ENVS = ['local', 'development', 'production'];
