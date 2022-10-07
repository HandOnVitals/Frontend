import { redirect, type Load } from '@sveltejs/kit';
import { readingStoreKey } from 'stores';

export const ssr = false;

// @ts-ignore
export function load(params) {
	const routeId = params.routeId;
	const emptySessionStorage = !sessionStorage.getItem(readingStoreKey) || sessionStorage.getItem(readingStoreKey) === '[]';
	if (emptySessionStorage && routeId !== 'access') {
		throw redirect(307, '/access');
	}
}
