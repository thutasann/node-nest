import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GatewayMoudle } from './gateway/gateway.module';

@Module({
	imports: [GatewayMoudle],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
