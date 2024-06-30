'use server';

import { IProduct } from '@/dto/IProduct';
import { revalidateTag } from 'next/cache';
import { CATALOG_SERVICE } from '../api';

export async function fetchTest(): Promise<{ message: string }> {
	const res = await fetch(CATALOG_SERVICE + '/example', {
		cache: 'no-store',
		next: {
			tags: ['example'],
		},
	});
	return await res.json();
}

export async function getProducts(): Promise<IProduct[]> {
	const response = await fetch(CATALOG_SERVICE + '/products', {
		cache: 'force-cache',
		next: {
			tags: ['products'],
		},
	});
	return await response.json();
}

export async function revalidateAction(tag: 'products') {
	revalidateTag(tag);
}
