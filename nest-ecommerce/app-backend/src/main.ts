import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDocument } from './core/swagger/swagger';
import cookieParser from 'cookie-parser';
import { ResponseTimeMiddleware } from './core/middleware/response-time.middleware';
import { TransformationInterceptor } from './core/interceptor/response.interceptor';

(async function bootstrap() {
	const logger = new Logger('Main');
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<string>('PORT');

	// cookie parser
	app.use(cookieParser());

	// middlewares
	app.use(new ResponseTimeMiddleware().use);

	// interceptor
	app.useGlobalInterceptors(new TransformationInterceptor());

	// swagger
	createDocument(app);

	// serving
	await app.listen(port);
	logger.log(`🚀 User Service is running on: http://localhost:${port}/`);
	logger.log(`🚀 Swagger is running on: http://localhost:${port}/docs`);
	logger.log(`🚀 worker pid=${process.pid}`);
})();
