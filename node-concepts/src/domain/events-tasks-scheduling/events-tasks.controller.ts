import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventTasksService } from './events-tasks.service';
import { CreateUserRequest } from 'src/core/dto/events-tasks/create-user.request';

@Controller('events-tasks')
@ApiTags('EventTaskSchedule')
export class EventTasksController {
	constructor(private readonly eventService: EventTasksService) {}

	@Get()
	eventHello() {
		return 'Hello From Events Tasks Module';
	}

	@Post()
	@ApiOperation({ description: 'create user task' })
	async createUser(@Body() body: CreateUserRequest): Promise<void> {
		return this.eventService.createUser(body);
	}
}
