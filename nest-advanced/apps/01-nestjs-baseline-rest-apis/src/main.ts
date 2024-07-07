require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './app/docs/swagger';
import { MyLoggerService } from '@dev/logger';
import { HttpExceptionFilter } from './app/core/filters';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useLogger(new MyLoggerService('context'));
	app.setGlobalPrefix('/api/v1');
	app.useGlobalFilters(new HttpExceptionFilter());
	createDocument(app);
	await app.listen(process.env.PORT || 3010);
}
bootstrap();
