import { redirect, type LoadEvent } from '@sveltejs/kit';
import { LOGIN_ROUTE } from 'constants/routes';

export function load(params: LoadEvent) {
	throw redirect(307, LOGIN_ROUTE);
}
