import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello From Nodejs Concepts! <br/> <a href="/docs">Swagger Here</a>';
	}
}
