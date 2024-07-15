import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';

@Module({
	imports: [MyGateway],
	controllers: [],
	providers: [],
})
export class GatewayMoudle {}
