import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Logger } from '@nestjs/common';

const port = 4001;

(async function bootstrap() {
	const logger = new Logger('Main (main.ts)');
	const app = await NestFactory.create(UsersModule);
	await app.listen(port);

	logger.log(`🚀 User Service is running on: http://localhost:${port}/`);
	logger.log(
		`🚀 User Service (Graphql) is running on: http://localhost:${port}/graphql`,
	);
})();
