import { type Application } from 'express';
import swaggerJsdoc, { type Options } from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Catalog Service',
			description: 'This is the Catalog Service for Nodejs Kafka MS',
			version: '1.0.0',
		},
	},
	apis: ['./routes/*.ts'],
};

const specs = swaggerJsdoc(options);

/**
 * setup swagger
 */
const setupSwagger = (app: Application) => {
	app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};

export default setupSwagger;
