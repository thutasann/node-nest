require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createDocument } from './app/docs/swagger';
import { MyLoggerService } from '@dev/logger';

async function bootstrap() {
	console.log('DATABASE_URL', process.env.DATABASE_URL);
	const app = await NestFactory.create(AppModule);
	app.useLogger(new MyLoggerService('context'));
	app.setGlobalPrefix('/api/v1');
	createDocument(app);
	await app.listen(process.env.PORT || 3010);
}
bootstrap();
