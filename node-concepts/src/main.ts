import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createDocument } from './core/swagger/swagger';
import { ResponseTimeMiddleware } from './core/middleware/response-time.middleware';
import { AppClusterService } from './app-cluster.service';
import { ThrottlerGuard } from '@nestjs/throttler';

const port = 3000;

async function bootstrap() {
	const logger = new Logger('Main (main.ts)');
	const app = await NestFactory.create(AppModule);

	createDocument(app);

	// app.use(new ResponseTimeMiddleware().use);

	await app.listen(port);
	logger.log(`🚀 App is running on: http://localhost:${port}/docs`);
	logger.log(`🚀 Swagger is running on: http://localhost:${port}/docs`);
	logger.log(`🚀 worker pid=${process.pid}`);
}

AppClusterService.clusterize(bootstrap);
