import { Logger, OnModuleInit } from '@nestjs/common';
import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import {
	ClientToServerEvents,
	InterServerEvents,
	ServerToClientEvents,
	SocketData,
} from 'src/types/socket.types';

@WebSocketGateway({})
export class MyGateway implements OnModuleInit {
	private readonly logger = new Logger(MyGateway.name);

	@WebSocketServer()
	private io = new Server<
		ClientToServerEvents,
		ServerToClientEvents,
		InterServerEvents,
		SocketData
	>();

	onModuleInit() {
		this.io.on('connection', (socket) => {
			this.logger.log(`connected socket ->  ${socket.id}`);
		});
	}

	@SubscribeMessage('newMessage')
	onNewMessage(@MessageBody() body: any) {
		this.logger.log(`newMessage body -> ${body}`);
		this.io.emit('onMessage', {
			msg: 'New mesage',
			content: body,
		});
	}
}
