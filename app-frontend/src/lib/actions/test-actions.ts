'use server';

import { CATALOG_SERVICE } from '../api';

export async function fetchTest(): Promise<{ message: string }> {
	const res = await fetch(CATALOG_SERVICE + '/example', { cache: 'no-store' });
	return await res.json();
}
