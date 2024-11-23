import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					ssl: false,
					brokers: ['localhost:9092'],
					clientId: 'billing-service',
					connectionTimeout: 10000, // Increased to 10 seconds
					retry: {
						initialRetryTime: 1000,
						retries: 8,
						maxRetryTime: 30000,
					},
				},
				consumer: {
					groupId: 'billing-consumer',
				},
			},
		},
	);
	try {
		await app.listen();
		console.log('Billing Microservice is listening');
	} catch (error) {
		console.error('Failed to connect to Kafka:', error);
		process.exit(1);
	}
}
bootstrap();
