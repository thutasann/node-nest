interface IAddress {
	street: string;
	city: string;
	country: string;
}

interface IUser {
	id: number;
	name: string;
	email: string;
	age: number;
	address?: IAddress;
}

type UserPreview = Pick<IUser, 'id' | 'name'>;

const userPreview: UserPreview = {
	id: 1,
	name: 'John Doe',
};

console.log('userPreview', userPreview);

// ----------------------------------------------------------------------------------------

type UserInfo = Pick<IUser, 'name' | 'email'>;

function getUserInfo(user: IUser): UserInfo {
	return {
		name: user.name,
		email: user.email,
	};
}

const user: IUser = {
	id: 1,
	name: 'John Doe',
	email: 'john.doe@example.com',
	age: 30,
};

const userInfo: UserInfo = getUserInfo(user);
console.log(userInfo);

// ----------------------------------------------------------------------------------------

type UserAddress = Pick<IUser, 'name' | 'address'>;

const userAdderss: UserAddress = {
	name: 'John Doe',
	address: {
		street: '123 Main St',
		city: 'Springfield',
		country: 'USA',
	},
};

// ----------------------------------------------------------------------------------------

class UserClass {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public age: number,
	) {}
}

type UserPreviewFromClass = Pick<UserClass, 'id' | 'name'>;

const userClass: UserPreviewFromClass = {
	id: 1,
	name: 'John Doe',
};

console.log('userClass', userClass);
