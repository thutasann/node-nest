export interface Student {
	name: string;
	grade: string;
}

export interface CartItem {
	name: string;
	price: number;
	quantity: number;
}

export interface User {
	id: number;
	name: string;
}

export interface UserProfile {
	id: number;
	age: number;
}

export interface Product {
	category: string;
	items: Array<{ name: string; price: number }>;
}

export const students: Student[] = [
	{ name: 'Alice', grade: 'A' },
	{ name: 'Bob', grade: 'B' },
	{ name: 'Charlie', grade: 'A' },
	{ name: 'David', grade: 'C' },
];

export const cart: CartItem[] = [
	{ name: 'Laptop', price: 1000, quantity: 1 },
	{ name: 'Mouse', price: 20, quantity: 2 },
	{ name: 'Keyboard', price: 50, quantity: 1 },
];

export const users: User[] = [
	{ id: 1, name: 'John' },
	{ id: 2, name: 'Jane' },
	{ id: 3, name: 'Bob' },
];

export const profiles: UserProfile[] = [
	{ id: 1, age: 30 },
	{ id: 2, age: 25 },
];

export const items = [
	{ name: 'Book', price: 20 },
	{ name: 'Pen', price: 2 },
	{ name: 'Laptop', price: 1500 },
];

export const fruits: string[] = [
	'apple',
	'banana',
	'orange',
	'apple',
	'banana',
	'apple',
];

export const nestedArray: number[][] = [
	[1, 2],
	[3, 4],
	[5, 6],
];

export const products: Product[] = [
	{
		category: 'Electronics',
		items: [
			{ name: 'Laptop', price: 1000 },
			{ name: 'Mouse', price: 50 },
		],
	},
	{
		category: 'Clothing',
		items: [
			{ name: 'Shirt', price: 30 },
			{ name: 'Shoes', price: 100 },
		],
	},
];
