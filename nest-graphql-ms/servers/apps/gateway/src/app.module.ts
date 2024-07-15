import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
			driver: ApolloGatewayDriver,
			gateway: {
				supergraphSdl: new IntrospectAndCompose({
					subgraphs: [],
				}),
			},
		}),
	],
	controllers: [],
	providers: [AppService],
})
export class AppModule {}
