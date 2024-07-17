import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Logger } from '@nestjs/common';
import { ResponseTimeMiddleware } from './core/middleware/response-time.middleware';

const port = 4001;

(async function bootstrap() {
	const logger = new Logger('Main (main.ts)');
	const app = await NestFactory.create(UsersModule);

	app.use(new ResponseTimeMiddleware().use);

	await app.listen(port);
	logger.log(`🚀 User Service is running on: http://localhost:${port}/`);
	logger.log(
		`🚀 User Service (Graphql) is running on: http://localhost:${port}/graphql`,
	);
})();
