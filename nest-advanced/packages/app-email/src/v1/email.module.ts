import { ConfigService } from '@dev/config';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
	imports: [ConfigService],
	controllers: [],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule {}
