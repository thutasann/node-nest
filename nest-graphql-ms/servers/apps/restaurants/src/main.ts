import { NestFactory } from '@nestjs/core';
import { RestaurantsModule } from './restaurants.module';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ResponseTimeMiddleware } from 'apps/users/src/core/middleware/response-time.middleware';

const port = 4002;

(async function bootstrap() {
	const logger = new Logger('Main (restaurants)');
	const app = await NestFactory.create<NestExpressApplication>(
		RestaurantsModule,
		{
			cors: true,
		},
	);

	app.use(new ResponseTimeMiddleware().use);

	// static assets
	app.useStaticAssets(join(__dirname, '..', 'public'));
	app.setBaseViewsDir(join(__dirname, '..', 'servers/email-templates'));
	app.setViewEngine('ejs');

	await app.listen(port);
	logger.log(`🚀 Restaurant Service is running on: http://localhost:${port}/`);
	logger.log(
		`🚀 Restaurant Service (Graphql) is running on: http://localhost:${port}/graphql`,
	);
})();
