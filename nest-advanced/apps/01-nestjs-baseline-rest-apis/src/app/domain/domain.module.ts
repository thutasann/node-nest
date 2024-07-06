import { DBModule } from '@dev/database';
import { Module } from '@nestjs/common';
import { UsersEntity } from './users/user.entity';
import { UserModule } from './users/user.module';

/**
 * Domain Module 🚀
 */
@Module({
	imports: [
		UserModule,
		DBModule.forRoot({
			entities: [UsersEntity],
		}),
	],
	providers: [],
	controllers: [],
})
export class DomainModoule {}
