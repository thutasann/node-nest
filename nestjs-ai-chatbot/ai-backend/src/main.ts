import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
	const logger = new Logger('Main.ts');
	const port = process.env.PORT;
	const app = await NestFactory.create(AppModule);
	await app.listen(port);
	logger.log(`🚀 AI Backend is running on port http://localhost:${port}`);
}
bootstrap();
