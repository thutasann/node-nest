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
	],
	controllers: [],
	providers: [
		RestaurantsService,
		ConfigService,
		JwtService,
		PrismaService,
		RestaurantResolver,
	],
})
export class RestaurantsModule {}
