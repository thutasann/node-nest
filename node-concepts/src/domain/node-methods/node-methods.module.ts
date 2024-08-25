import { Module } from '@nestjs/common';
import { NodeMethodsController } from './node-methods.controller';

@Module({
	imports: [],
	controllers: [NodeMethodsController],
})
export class NodeMethodsModule {}
