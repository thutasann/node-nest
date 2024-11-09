type User = {
	name: string;
	age: number;
};

// optional properties
type PartialUser = {
	[K in keyof User]?: User[K];
};

// readonly properties
type ReadonlyUser = {
	readonly [K in keyof User]: User[K];
};

const obj_user: User = { name: 'john doe', age: 30 };

const partial_obj_user: PartialUser = {};

const readonly_obj_user: ReadonlyUser = {
	name: 'john',
	age: 22,
};

// readonly_obj_user.age = '123'; // cannot assign
obj_user.name = 'John doe updated';
