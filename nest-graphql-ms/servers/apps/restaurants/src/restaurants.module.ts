import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import {
	ApolloFederationDriver,
	ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RestaurantResolver } from './restaurants.resolver';
import { EmailModule } from './email/email.module';
import { CloudinaryModule } from './domain/cloudinary/cloudinary.module';
import { CloudinaryService } from './domain/cloudinary/cloudinary.service';
import { FoodsService } from './domain/food/foods.service';
import { FoodsResolver } from './domain/food/foods.resolver';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: 2,
			},
		}),
		EmailModule,
		CloudinaryModule,
	],
	controllers: [],
	providers: [
		RestaurantsService,
		ConfigService,
		JwtService,
		PrismaService,
		RestaurantResolver,
		CloudinaryService,
		FoodsResolver,
		FoodsService,
	],
})
export class RestaurantsModule {}
