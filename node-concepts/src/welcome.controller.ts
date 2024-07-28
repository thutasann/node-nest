import { Controller, Get } from '@nestjs/common';

@Controller('')
export class WelcomeController {
	@Get()
	welcome() {
		return 'Hello From Nodejs Concepts! <br/> <a href="/docs">Swagger Here</a>';
	}
}
