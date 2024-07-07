import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';

/**
 * Auth Module for demonstrating Cyclic Depedencies
 */
@Module({
	imports: [forwardRef(() => UserModule)],
	controllers: [],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
