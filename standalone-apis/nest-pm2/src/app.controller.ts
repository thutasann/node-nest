import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get('blocking')
	blocking(@Query('cpuTimeMs') cpuTimems: string) {
		return this.appService.blocking(parseInt(cpuTimems));
	}

	@Get('worker')
	async worker(@Query('cpuTimeMs') cpuTimeMs: string) {
		return await this.appService.woker(parseInt(cpuTimeMs));
	}
}
