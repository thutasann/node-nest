import { Module } from '@nestjs/common';
import { BlockingVsNonBlockingController } from './blocking-vs-non-blocking.controller';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';
import { MultiThreadController } from './multithread.controller';

@Module({
	controllers: [BlockingVsNonBlockingController, MultiThreadController],
	providers: [BlockingVsNonBlockingService],
})
export class BlockingVsNonBlockingModule {}
