import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createDocument } from './docs/swagger';

(async function bootstrap() {
	const logger = new Logger('Main.ts');
	const port = process.env.PORT;
	const env = process.env.NODE_ENV;
	const app = await NestFactory.create(AppModule);
	createDocument(app);
	await app.listen(port);
	const serviceUrl =
		env === 'DEVELOPMENT'
			? `http://localhost:${port}`
			: 'https://nest-ai-chat.onrender.com/';
	logger.log(`🚀 AI Backend is running on port ${serviceUrl}`);
})();
