import { Controller, Get } from '@nestjs/common';

@Controller()
export class UsersController {
	@Get()
	getHello() {
		return "<h1>Hello from User Service</h1> <p>Here is <a href='/graphql'>GraphQL playground.</a> 🚀</p>";
	}
}
