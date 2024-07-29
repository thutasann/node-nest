import { Module } from '@nestjs/common';
import { BlockingVsNonBlockingController } from './blocking-vs-non-blocking.controller';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';
import { MultiThreadController } from './multithread.controller';
import { ClusterController } from './cluster.controller';

@Module({
	controllers: [
		BlockingVsNonBlockingController,
		MultiThreadController,
		ClusterController,
	],
	providers: [BlockingVsNonBlockingService],
})
export class BlockingVsNonBlockingModule {}
