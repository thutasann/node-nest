import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockingVsNonBlockingModule } from './domain/blocking-vs-non-blocking/blocking-vs-non-blocking.module';
import { WelcomeController } from './welcome.controller';
import { ALSModule } from './domain/async-local-storage/als.module';
import { AlsMiddleware } from './core/middleware/als.middleware';

@Module({
	imports: [BlockingVsNonBlockingModule, ALSModule],
	controllers: [WelcomeController, AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AlsMiddleware).forRoutes('*');
	}
}
