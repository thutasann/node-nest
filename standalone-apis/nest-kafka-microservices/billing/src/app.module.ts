import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'AUTH_SERVICE',
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'auth',
						ssl: false,
						brokers: ['localhost:9092'],
						connectionTimeout: 10000, // Increased to 10 seconds
						retry: {
							initialRetryTime: 1000,
							retries: 8,
							maxRetryTime: 30000,
						},
					},
					consumer: {
						groupId: 'auth-consumer',
					},
				},
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}