import { Module } from '@nestjs/common';
import { ErrorHandlingControler } from './error-handling.controller';

@Module({
	imports: [],
	controllers: [ErrorHandlingControler],
})
export class ErrorHandlingModule {}
