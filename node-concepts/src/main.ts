import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createDocument } from './core/swagger/swagger';

const port = 3000;

(async function bootstrap() {
	const logger = new Logger('Main (main.ts)');
	const app = await NestFactory.create(AppModule);

	createDocument(app);

	await app.listen(port);
	logger.log(`🚀 Swagger is running on: http://localhost:${port}/docs`);
})();
