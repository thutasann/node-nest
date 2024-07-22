import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Logger } from '@nestjs/common';
import { ResponseTimeMiddleware } from './core/middleware/response-time.middleware';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const port = 4001;

(async function bootstrap() {
	const logger = new Logger('Main (users)');
	const app = await NestFactory.create<NestExpressApplication>(UsersModule, {
		cors: true,
	});

	// middlewares
	app.use(new ResponseTimeMiddleware().use);

	// static assets
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'));
	app.setViewEngine('ejs');

	await app.listen(port);
	logger.log(`🚀 User Service is running on: http://localhost:${port}/`);
	logger.log(
		`🚀 User Service (Graphql) is running on: http://localhost:${port}/graphql`,
	);
})();
