import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from 'src/shared/repositories/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from 'src/shared/schema/products.schema';
import { Users, UserSchema } from 'src/shared/schema/user.schema';
import { License, LicenseSchema } from 'src/shared/schema/license.schema';
import { AuthMiddleware } from 'src/core/middleware/auth.middleware';
import { appPrefix } from 'src/main';
import { UserRespository } from 'src/shared/repositories/user.repository';

/**
 * Products Module
 */
@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ProductRepository, UserRespository],
	imports: [
		MongooseModule.forFeature([{ name: Products.name, schema: ProductSchema }]),
		MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
		MongooseModule.forFeature([{ name: License.name, schema: LicenseSchema }]),
	],
})
export class ProductsModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude(
				{
					path: `${appPrefix}/products`,
					method: RequestMethod.GET,
				},
				{
					path: `${appPrefix}/products/:id`,
					method: RequestMethod.GET,
				},
			)
			.forRoutes(ProductsController);
	}
}
