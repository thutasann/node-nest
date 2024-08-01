import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockingVsNonBlockingModule } from './domain/blocking-vs-non-blocking/blocking-vs-non-blocking.module';
import { WelcomeController } from './welcome.controller';
import { ALSModule } from './domain/async-local-storage/als.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { EventTaskScheduleModule } from './domain/events-tasks-scheduling/events-tasks.module';
import { ErrorHandlingModule } from './domain/error-handling/error-handling.module';
import { SecurityPracticesModule } from './domain/security-best-practices/security-practices.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		ScheduleModule.forRoot(),
		BlockingVsNonBlockingModule,
		SecurityPracticesModule,
		ErrorHandlingModule,
		ALSModule,
		EventTaskScheduleModule,
		ThrottlerModule.forRoot([
			{
				ttl: 60, // Time to live (seconds),
				limit: 10, // Number of requests withing the TTL
			},
		]),
	],
	controllers: [WelcomeController, AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {}
