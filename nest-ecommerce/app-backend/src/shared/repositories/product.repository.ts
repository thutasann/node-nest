import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../schema/products.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { License } from '../schema/license.schema';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { GroupedProductsProps } from '../data-types/products.type';
import { ParsedOptions } from 'qs-to-mongo/dist/query/options-to-mongo';

@Injectable()
export class ProductRepository {
	private cache: { [key: string]: { value: Products; expiredAt: number } } = {};

	constructor(
		@InjectModel(Products.name) private readonly _productModel: Model<Products>,
		@InjectModel(License.name) private readonly _licenseModel: Model<License>,
	) {}

	/** create product */
	async create(product: CreateProductDto) {
		return await this._productModel.create(product);
	}

	/** find one product */
	async findOne(query: FilterQuery<Products>) {
		const cacheKey = JSON.stringify(query);
		const cachedProduct = this.getCache(cacheKey);

		if (cachedProduct) return cachedProduct;

		const product = await this._productModel.findOne(query);

		if (product) this.setCache(cacheKey, product);

		return product;
	}

	/** find one and update */
	async findOneAndUpdate(
		query: FilterQuery<Products>,
		update: UpdateQuery<Products>,
	) {
		const product = await this._productModel.findOneAndUpdate(query, update, {
			new: true,
		});
		return product;
	}

	/** find one and delete */
	async findOneAndDelete(query: FilterQuery<Products>) {
		return await this._productModel.findOneAndDelete(query);
	}

	/** find products with group by */
	async findProductWithGroupBy(): Promise<GroupedProductsProps[]> {
		const products = await this._productModel.aggregate<GroupedProductsProps>([
			{
				$facet: {
					latestProducts: [{ $sort: { createdAt: -1 } }, { $limit: 4 }],
					topRatedProducts: [{ $sort: { avgRating: -1 } }, { $limit: 8 }],
				},
			},
		]);
		return products;
	}

	/** find related products */
	async findRelatedProducts(query: Record<string, any>) {
		const products = await this._productModel.aggregate<Products>([
			{
				$match: query,
			},
			{
				$sample: { size: 4 },
			},
		]);
		return products;
	}

	/** find products */
	async find(query: Record<string, any>, options: ParsedOptions) {
		options.sort = options.sort || { _id: 1 };
		options.limit = options.limit || 12;
		options.skip = options.skip || 0;

		if (query.search) {
			query.productName = new RegExp(query.search, 'i');
			delete query.search;
		}

		const products = await this._productModel.aggregate<Products>([
			{
				$match: query,
			},
			{
				$sort: options.sort,
			},
			{ $skip: options.skip },
			{
				$limit: options.limit,
			},
		]);

		const totalProductCount = await this._productModel.countDocuments(query);
		return {
			totalProductCount,
			products,
		};
	}

	/** create license */
	async createLicense(product: string, productSku: string, licenseKey: string) {
		const license = await this._licenseModel.create({
			product,
			productSku,
			licenseKey,
		});
		return license;
	}

	/** remove license */
	async removeLicense(query: FilterQuery<License>) {
		const license = await this._licenseModel.findOneAndDelete(query);
		return license;
	}

	/** find license */
	async findLicense(query: FilterQuery<License>, limit?: number) {
		if (limit && limit > 0) {
			const license = await this._licenseModel.find(query).limit(limit);
			return license;
		}
		const license = await this._licenseModel.find(query);
		return license;
	}

	/** update license */
	async updateLicense(
		query: FilterQuery<License>,
		update: UpdateQuery<License>,
	) {
		const license = await this._licenseModel.findOneAndUpdate(query, update, {
			new: true,
		});
		return license;
	}

	/** update license many */
	async updateLicenseMany(query: FilterQuery<License>, data: Partial<License>) {
		const license = await this._licenseModel.updateMany(query, data);
		return license;
	}

	/** delete all license */
	async deleteAllLicense(productId: string, skuId: string) {
		if (productId)
			return await this._licenseModel.deleteMany({ product: productId });
		return await this._licenseModel.deleteMany({ productSku: skuId });
	}

	/** delete sku */
	async deleteSku(_id: string, skuId: string) {
		return await this._productModel.updateOne(
			{
				_id,
			},
			{
				$pull: {
					skuDetails: { _id: skuId },
				},
			},
		);
	}

	/** @private set cache */
	private setCache(key: string, value: Products, ttl: number = 10000) {
		const expiredAt = Date.now() + ttl;
		this.cache[key] = { value, expiredAt };
	}

	/** @private get cache */
	private getCache(key: string): Products | null {
		const cachedData = this.cache[key];
		if (!cachedData) {
			return null;
		}

		if (Date.now() > cachedData.expiredAt) {
			delete this.cache[key];
			return null;
		}

		return cachedData.value;
	}
}
