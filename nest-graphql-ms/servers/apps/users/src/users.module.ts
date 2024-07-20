import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {
	ApolloFederationDriver,
	ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { UsersController } from './users.controller';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloFederationDriverConfig>({
			driver: ApolloFederationDriver,
			autoSchemaFile: {
				federation: 2,
			},
			csrfPrevention: false,
			context: ({ req }) => ({
				headers: req.headers,
			}),
			playground: true,
			debug: true,
			introspection: true,
		}),
		EmailModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
	],
	controllers: [UsersController],
	providers: [
		UserResolver,
		PrismaService,
		UsersService,
		ConfigService,
		JwtService,
	],
})
export class UsersModule {}
