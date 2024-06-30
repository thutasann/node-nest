import { faker } from '@faker-js/faker';
import { ICatalogRepository } from '../../interfaces/catalog.interface';
import { MockCatalogRepository } from '../../repository/mockCatalog.repository';

const mockProduct = <T>(
	rest: T,
): {
	name: string;
	description: string;
	stock: number;
} & T => {
	return {
		name: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		stock: faker.number.int({ min: 10, max: 100 }),
		...rest,
	};
};

describe('catalogService', () => {
	let repository: ICatalogRepository;

	beforeEach(() => {
		repository = new MockCatalogRepository();
	});

	afterEach(() => {
		repository = {} as MockCatalogRepository;
	});
});
