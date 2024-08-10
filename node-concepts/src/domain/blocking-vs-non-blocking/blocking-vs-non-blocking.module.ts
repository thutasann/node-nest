import { Module } from '@nestjs/common';
import { BlockingVsNonBlockingController } from './blocking-vs-non-blocking.controller';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';
import { MemoryManagementController } from './memory-management.controller';
import { MultiThreadController } from '../performance/multithread.controller';
import { ClusterController } from '../performance/cluster.controller';
import { StreamController } from '../performance/stream-controller';
import { EventLoopController } from './event-loop.controller';

/**
 * Module that is related to Performance
 */
@Module({
	controllers: [
		BlockingVsNonBlockingController,
		MultiThreadController,
		ClusterController,
		MemoryManagementController,
		EventLoopController,
		StreamController,
	],
	providers: [BlockingVsNonBlockingService],
})
export class BlockingVsNonBlockingModule {}
