type ConditionalOmit<T, U> = {
	[K in keyof T as T[K] extends U ? never : K]: T[K];
};

type ConditionalUser = {
	id: number;
	name: string;
	isAdmin: boolean;
};

type WithoutBooleanProps = ConditionalOmit<ConditionalUser, boolean>;
