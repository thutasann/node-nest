import { Factory } from 'rosie';
import { Product } from '../../models/product.model';
import { faker } from '@faker-js/faker';

/**
 * Product Factory for jest
 */
export const ProductFactory = new Factory<Product>()
	.attr('id', '6681051e685acb3b412b7780')
	.attr('name', faker.commerce.productName())
	.attr('description', faker.commerce.productDescription())
	.attr('stock', faker.number.int({ min: 10, max: 100 }))
	.attr('price', +faker.commerce.price());
