import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModoule } from './app/domain/domain.module';

@Module({
	imports: [DomainModoule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
