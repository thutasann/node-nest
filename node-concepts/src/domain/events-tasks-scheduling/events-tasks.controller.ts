import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventTasksService } from './events-tasks.service';
import { CreateUserRequest } from 'src/core/dto/events-tasks/create-user.request';
import { TicketManager } from 'src/core/events/ticket-manage';

@Controller('events-tasks')
@ApiTags('events-tasks-schedule')
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

	@Get('/node-events')
	async nodeEventsSampleOne() {
		let result: object = {};
		const ticketManager = new TicketManager(3);

		ticketManager.on('buy', (email, price, timestamp) => {
			console.log('email', email);
			console.log('price', price, timestamp);

			result = { email, price, timestamp };
		});

		ticketManager.buy('thuta@gmail.com', 10);

		return result;
	}
}
