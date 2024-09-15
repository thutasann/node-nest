export interface Person {
	name: string;
	age: number;
}

export const people: Person[] = [
	{ name: 'Alice', age: 25 },
	{ name: 'Bob', age: 30 },
	{ name: 'Charlie', age: 35 },
];

export const products: { id: number; name: string; price: number }[] = [
	{ id: 1, name: 'Product 1', price: 100 },
	{ id: 2, name: 'Product 2', price: 150 },
	{ id: 3, name: 'Product 3', price: 200 },
	{ id: 4, name: 'Product 4', price: 250 },
	{ id: 5, name: 'Product 5', price: 300 },
];

export const users: { id: number; username: string }[] = [
	{ id: 1, username: 'alice' },
	{ id: 2, username: 'bob' },
	{ id: 3, username: 'charlie' },
	{ id: 4, username: 'daniel' },
	{ id: 5, username: 'eve' },
];
