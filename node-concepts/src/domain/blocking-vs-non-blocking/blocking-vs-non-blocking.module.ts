import { Module } from '@nestjs/common';
import { BlockingVsNonBlockingController } from './blocking-vs-non-blocking.controller';
import { BlockingVsNonBlockingService } from './blocking-vs-non-blocking.service';
import { MultiThreadController } from './multithread.controller';
import { ClusterController } from './cluster.controller';
import { MemoryManagementController } from './memory-management.controller';

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
