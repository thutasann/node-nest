import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schema/user.schema';
import { FilterQuery, Model } from 'mongoose';

/** User Repository */
export class UserRespository {
	constructor(
		@InjectModel(Users.name) private readonly userModel: Model<Users>,
	) {}

	async findOne(query: FilterQuery<Users>) {
		return await this.userModel.findOne(query);
	}

	async find(query: FilterQuery<Users>) {
		return await this.userModel.find(query);
	}

	async create(data: Record<string, any>) {
		return await this.userModel.create(data);
	}

	async updateOne(query: FilterQuery<Users>, data: Record<string, any>) {
		return await this.userModel.updateOne(query, data);
	}

	async findById(id: string) {
		return this.userModel.findById(id);
	}
}
