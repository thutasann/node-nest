import { Module } from '@nestjs/common';
import { EventTasksController } from './events-tasks.controller';
import { EventTasksService } from './events-tasks.service';

/**
 * Events and Tasks Schedule Module
 */
@Module({
	imports: [],
	controllers: [EventTasksController],
	providers: [EventTasksService],
})
export class EventTaskScheduleModule {}
