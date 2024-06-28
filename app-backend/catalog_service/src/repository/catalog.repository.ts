import { PrismaClient } from '@prisma/client';
import { ICatalogRepository } from '../interfaces/catalog.interface';
import { Product } from '../models/product.model';

export class CatalogRepository implements ICatalogRepository {
	private readonly _prisma: PrismaClient;

	constructor() {
		this._prisma = new PrismaClient();
	}

	async create(data: Product): Promise<Product> {
		return await this._prisma.product.create({
			data,
		});
	}

	async update(data: Product): Promise<Product> {
		return await this._prisma.product.update({
			where: { id: data.id },
			data,
		});
	}

	async delete(id: number) {
		return await this._prisma.product.delete({
			where: { id },
		});
	}

	async find(limit: number, offset: number): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}

	async findOne(id: number): Promise<Product> {
		throw new Error('Method not implemented.');
	}
}
