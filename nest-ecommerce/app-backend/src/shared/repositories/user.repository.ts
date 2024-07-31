import { InjectModel } from '@nestjs/mongoose';
import { Users } from '../schema/user.schema';
import { Model } from 'mongoose';

/** User Repository */
export class UserRespository {
	constructor(
		@InjectModel(Users.name) private readonly userModel: Model<Users>,
	) {}
}
