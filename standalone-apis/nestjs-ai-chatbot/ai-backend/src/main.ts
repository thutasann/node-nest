import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { createDocument } from './docs/swagger';
import { port, serviceUrl } from './lib/constants';

(async function bootstrap() {
	const logger = new Logger('Main.ts');
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	createDocument(app);

	await app.listen(port);
	logger.log(`🚀 Docker is running on ${serviceUrl}/docs`);
	logger.log(`🚀 AI Backend is running on port ${serviceUrl}`);
})();
