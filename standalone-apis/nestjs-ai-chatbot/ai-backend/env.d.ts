declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: number;
		OPENAI_API_KEY: string;
		NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION';
	}
}
