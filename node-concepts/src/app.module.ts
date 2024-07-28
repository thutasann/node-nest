import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockingVsNonBlockingModule } from './blocking-vs-non-blocking/blocking-vs-non-blocking.module';
import { WelcomeController } from './welcome.controller';

@Module({
	imports: [BlockingVsNonBlockingModule],
	controllers: [WelcomeController, AppController],
	providers: [AppService],
})
export class AppModule {}
