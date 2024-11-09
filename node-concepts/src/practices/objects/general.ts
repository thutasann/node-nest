// ----------------- Conditional Types

type IsString<T> = T extends string ? 'Yes' : 'No';

type Test1 = IsString<string>;
type Test2 = IsString<number>;

// ----------------- Extracting Property Types

type ExtractUser = {
	id: number;
	name: string;
	isAdmin: boolean;
};

type UserIdType = ExtractUser['id'];
type UserKeys = keyof ExtractUser;

const user_keys: UserKeys = 'id';

// ----------------- Utilities Types

type UtilUser = {
	id: number;
	name: string;
	email?: string;
};

type RequierUser = Required<UtilUser>;
type UserWithoutEmail = Omit<UtilUser, 'email'>;
type UserIdAndName = Pick<UtilUser, 'id' | 'name'>;
const user_without_email: UserWithoutEmail = { id: 123, name: 'ok' };
const user_id_name: UserIdAndName = { id: 123, name: 'ok' };
