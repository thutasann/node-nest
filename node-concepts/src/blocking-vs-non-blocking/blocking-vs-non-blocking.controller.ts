import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';

@Controller('blocking-vs-non-blocking')
@ApiTags('blocking-vs-non-blocking')
export class BlockingVsNonBlockingController {
	constructor(private readonly service: BlockingVsNonBlockingService) {}

	@Get()
	async getHello() {
		return 'Hello from blocking vs non-blocking';
	}

	@Get('/blocking')
	blocking() {
		return this.service.blocking();
	}

	@Get('/non-blocking')
	async nonBlocking() {
		return this.service.nonBlocking();
	}

	@Get('/promises')
	async promises() {
		return this.service.promises();
	}

	@Get('/promises-parallel')
	async promisesParallel() {
		return this.service.promiseParallel();
	}
}
