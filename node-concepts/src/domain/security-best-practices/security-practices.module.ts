import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';

/**
 * Security Best Practices Module
 */
@Module({
	controllers: [SecurityController],
})
export class SecurityPracticesModule {}
