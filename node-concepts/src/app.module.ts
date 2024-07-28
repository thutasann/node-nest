import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockingVsNonBlockingModule } from './blocking-vs-non-blocking/blocking-vs-non-blocking.module';

@Module({
	imports: [BlockingVsNonBlockingModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
