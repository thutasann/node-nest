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

@Module({
	imports: [
		EventEmitterModule.forRoot(),
		ScheduleModule.forRoot(),
		BlockingVsNonBlockingModule,
		ErrorHandlingModule,
		ALSModule,
		EventTaskScheduleModule,
	],
	controllers: [WelcomeController, AppController],
	providers: [AppService],
})
export class AppModule {}
