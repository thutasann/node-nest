import { Module } from '@nestjs/common';
import { BlockingVsNonBlockingController } from './blocking-vs-non-blocking.controller';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';

@Module({
	controllers: [BlockingVsNonBlockingController],
	providers: [BlockingVsNonBlockingService],
})
export class BlockingVsNonBlockingModule {}
