declare namespace NodeJS {
	export interface ProcessEnv {
		PORT: string;
		MONGO_URL: string;
		JWT_SECRET: string;
		adminSecretToken: string;

		SMTP_HOST: string;
		SMTP_PORT: number;
		SMTP_SERVICE: string;
		SMTP_MAIL: string;
		SMTP_PASSWORD: string;
	}
}
