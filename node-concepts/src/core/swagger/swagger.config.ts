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
	title: 'Nodejs Concepts',
	description: 'Swagger for Nodejs Concepts Examples',
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
			'https://github.com/thutasann/node-nest/tree/master/node-concepts',
	},
};

/**
 * Swagger Environments
 */
export const SWAGGER_ENVS = ['local', 'development', 'production'];
