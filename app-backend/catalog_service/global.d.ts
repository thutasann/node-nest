declare namespace NodeJS {
	export interface ProcessEnv {
		/** catalog service port */
		CATALOG_PORT: 8000;
		NODE_ENV: 'production' | 'development';
	}
}
