declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		DATABASE_URL: string;
		LOG_LEVEL: string;
	}
}
