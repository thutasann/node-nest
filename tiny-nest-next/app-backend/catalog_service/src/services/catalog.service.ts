import { Product } from '../models/product.model';
import { CatalogRepository } from '../repository/catalog.repository';

/**
 * Catalog Service
 */
export class CatalogService {
	private readonly _catalogRepo: CatalogRepository;

	constructor(catalogRepo: CatalogRepository) {
		this._catalogRepo = catalogRepo;
	}

	async createProduct(payload: Product) {
		const data = await this._catalogRepo.create(payload);
		if (!data.id) {
			throw new Error('unable to create product');
		}
		return data;
	}

	async updateProduct(payload: any) {
		const data = await this._catalogRepo.update(payload);
		if (!data.id) {
			throw new Error('unable to update product');
		}
		return data;
	}

	async getProducts(limit: number, offset: number) {
		return await this._catalogRepo.find(limit, offset);
	}

	async getProduct(id: string) {
		return await this._catalogRepo.findOne(id);
	}

	async deleteProduct(id: string) {
		const response = await this._catalogRepo.delete(id);
		return response;
	}
}
