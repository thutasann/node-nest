import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

(async function bootstrap() {
	const logger = new Logger('Main');
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	const port = configService.get<string>('PORT');

	await app.listen(port);
	logger.log(`🚀 User Service is running on: http://localhost:${port}/`);
})();
