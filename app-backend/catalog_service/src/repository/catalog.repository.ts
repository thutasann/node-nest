import { PrismaClient } from '@prisma/client';
import { ICatalogRepository } from '../interfaces/catalog.interface';
import { Product } from '../models/product.model';
import { NotFoundError } from '../utils/error/errors';

export class CatalogRepository implements ICatalogRepository {
	private readonly _prisma?: PrismaClient;

	constructor() {
		this._prisma = new PrismaClient();
	}

	async create(data: Product): Promise<Product> {
		return await this._prisma!.product.create({
			data,
		});
	}

	async update(data: Product): Promise<Product> {
		return await this._prisma!.product.update({
			where: { id: data.id },
			data,
		});
	}

	async delete(id: string) {
		return await this._prisma!.product.delete({
			where: { id },
		});
	}

	async find(limit: number, offset: number): Promise<Product[]> {
		let response: any;
		if (limit && offset) {
			response = this._prisma!.product.findMany({
				take: limit,
				skip: offset,
			});
		} else {
			response = await this._prisma!.product.findMany();
		}
		return response;
	}

	async findOne(id: string): Promise<Product> {
		const product = await this._prisma!.product.findFirst({
			where: { id },
		});
		if (product) {
			return Promise.resolve(product);
		}
		throw new NotFoundError('product not found');
	}
}
