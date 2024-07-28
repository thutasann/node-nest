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
	title: 'Nodejs Concepts',
	description: 'Swagger for Nodejs Concepts Examples',
	version: '1.0',
	tags: [],
};

/**
 * Swagger Environments
 */
export const SWAGGER_ENVS = ['local', 'development', 'production'];
