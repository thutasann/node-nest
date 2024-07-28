import { Controller, Get, Header, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsyncLocalStorage } from 'async_hooks';
import { StoreProps } from 'src/core/middleware/als.middleware';

@Controller('als')
@ApiTags('async-localstorage')
export class ALSController {
	constructor(private readonly als: AsyncLocalStorage<StoreProps>) {}

	@Get()
	helloALS() {
		return {
			message: this.als.getStore(),
		};
	}
}
