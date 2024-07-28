import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_CONFIG, SWAGGER_ENVS } from './swagger.config';
import { INestApplication } from '@nestjs/common';

/**
 * create an OpenAPI document for an applicationm, via swagger.
 * @param app - the nestjs application
 * @returns the openAPI document
 */
export function createDocument(app: INestApplication | any) {
	const builder = new DocumentBuilder()
		.setTitle(SWAGGER_CONFIG.title)
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
			'authoirzation',
		)
		.setDescription(SWAGGER_CONFIG.description)
		.setVersion(SWAGGER_CONFIG.version);

	for (const tag of SWAGGER_CONFIG.tags) {
		builder.addTag(tag);
	}

	const options = builder.build();

	if (SWAGGER_ENVS.includes('local')) {
		const document = SwaggerModule.createDocument(app, options);
		SwaggerModule.setup('docs', app, document);
	}
}
