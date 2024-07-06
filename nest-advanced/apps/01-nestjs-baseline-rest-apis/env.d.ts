declare namespace NodeJS {
	export interface ProcessEnv {
		/** nestjs baseline rest api port */
		PORT: number;
		NODE_ENV: string;
		NEW_RELIC_KEY: string;
		DATABASE_URL: string;
		SWAGGER_USERNAME: string;
		SWAGGER_PASSWORD: string;
	}
}
