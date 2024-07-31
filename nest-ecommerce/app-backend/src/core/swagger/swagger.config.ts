/**
 * Specifies configuration for the swagger UI (found at /api)
 */
export interface ISwaggerConfig {
	title: string;
	description: string;
	version: string;
	tags: string[];
	contact: {
		name: string;
		url: string;
		email: string;
	};
	external: {
		desc: string;
		externalUrl: string;
	};
}

/**
 * Configuration for the swagger UI
 */
export const SWAGGER_CONFIG: ISwaggerConfig = {
	title: 'Nestjs Ecommerce Microservices',
	description: 'Swagger forNestjs Ecommerce Microservices',
	version: '1.0',
	tags: [],
	contact: {
		name: 'Thuta Sann',
		url: 'https://thutadev.vercel.app/',
		email: 'thutasann2002@gmail.com',
	},
	external: {
		desc: 'Github Repo',
		externalUrl:
			'https://github.com/thutasann/node-nest/tree/master/nest-ecommerce-ms',
	},
};

/**
 * Swagger Environments
 */
export const SWAGGER_ENVS = ['local', 'development', 'production'];
