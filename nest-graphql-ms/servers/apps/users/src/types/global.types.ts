export type UserData = {
	name: string;
	email: string;
	password: string;
	phone_number: number;
};

export type EmailOptions = {
	subject: string;
	email: string;
	name: string;
	activationCode: string;
	template: string;
};
