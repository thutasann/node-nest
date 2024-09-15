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

export interface Action {
	type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_ITEM';
	payload: { id: number; name?: string; price?: number };
}

export interface CartItemTwo {
	id: number;
	name: string;
	price: number;
}

export interface DataBatch {
	data: number[];
	processed: number[];
}

export interface Category {
	id: number;
	name: string;
	subCategories?: SubCategory[];
}

export interface SubCategory {
	id: number;
	name: string;
	categoryId: number;
}

// --------------------------- DATA  ---------------------------

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

export const actions: Action[] = [
	{ type: 'ADD_ITEM', payload: { id: 1, name: 'Laptop', price: 1000 } },
	{ type: 'ADD_ITEM', payload: { id: 2, name: 'Mouse', price: 50 } },
	{ type: 'UPDATE_ITEM', payload: { id: 1, price: 900 } },
	{ type: 'REMOVE_ITEM', payload: { id: 2 } },
];

export const dataBatches: DataBatch[] = [
	{ data: [1, 2, 3], processed: [] },
	{ data: [4, 5, 6], processed: [] },
];

export const categories: Category[] = [
	{ id: 1, name: 'Electronics' },
	{ id: 2, name: 'Clothing' },
	{ id: 3, name: 'Books' },
];

export const subCategories: SubCategory[] = [
	{ id: 101, name: 'Laptops', categoryId: 1 },
	{ id: 102, name: 'Cameras', categoryId: 1 },
	{ id: 201, name: 'Shirts', categoryId: 2 },
	{ id: 202, name: 'Shoes', categoryId: 2 },
	{ id: 301, name: 'Fiction', categoryId: 3 },
	{ id: 302, name: 'Non-fiction', categoryId: 3 },
];
