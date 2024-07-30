import { Module } from '@nestjs/common';
import { BlockingVsNonBlockingController } from './blocking-vs-non-blocking.controller';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';
import { MemoryManagementController } from './memory-management.controller';
import { MultiThreadController } from '../performance/multithread.controller';
import { ClusterController } from '../performance/cluster.controller';

/**
 * Module that is related to Performance
 */
@Module({
	controllers: [
		BlockingVsNonBlockingController,
		MultiThreadController,
		ClusterController,
		MemoryManagementController,
	],
	providers: [BlockingVsNonBlockingService],
})
export class BlockingVsNonBlockingModule {}
