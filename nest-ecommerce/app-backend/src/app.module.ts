import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HTTPExceptionFilter } from './core/filter/http-exception.filter';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URL'),
			}),
			inject: [ConfigService],
		}),
		UsersModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: 'APP_FILTER',
			useClass: HTTPExceptionFilter,
		},
	],
})
export class AppModule {}
