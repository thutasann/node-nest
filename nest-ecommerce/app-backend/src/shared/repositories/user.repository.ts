import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schema/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { UpdateData } from '../data-types/queries.type';

/** User Repository */
export class UserRespository {
	constructor(
		@InjectModel(Users.name) private readonly userModel: Model<Users>,
	) {}

	async findOne(query: FilterQuery<Users>) {
		return await this.userModel.findOne(query);
	}

	async find(query?: FilterQuery<Users>) {
		return await this.userModel.find(query);
	}

	async create(data: Partial<Users>) {
		return await this.userModel.create(data);
	}

	async updateOne(
		query: FilterQuery<Users>,
		data: UpdateData<Users>,
		upsert?: boolean,
	) {
		return await this.userModel.updateOne(query, data, { upsert });
	}

	async findById(id: string) {
		return this.userModel.findById(id);
	}
}
