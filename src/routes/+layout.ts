import { redirect, type LoadEvent } from '@sveltejs/kit';
import { ACCESS_ROUTE, LOGIN_ROUTE } from 'constants/routes';
import { readingStoreKey, tokenAccessStoreKey, tokenRefreshStoreKey } from 'stores';
import { itemInSessionStorage } from 'utils/storage';

export const ssr = false;

export function load(params: LoadEvent) {
	const routeId = params.routeId;

	const hasAccessToken = itemInSessionStorage(tokenAccessStoreKey);
	const hasRefreshToken = itemInSessionStorage(tokenRefreshStoreKey);
	const hasReadings = itemInSessionStorage(readingStoreKey);

	if ((!hasAccessToken || !hasRefreshToken) && routeId != 'login') {
		throw redirect(307, LOGIN_ROUTE);
	}

	// Here the user has tokens
	// If the user has no readings, and we are not on the login, access, or base routes
	// (I.e.: we are on a route that needs the readings such as the reading or the history routes)
	// Then redirect the user to the access route
	if (!hasReadings && routeId != 'login' && routeId != 'access' && routeId != '') {
		throw redirect(307, ACCESS_ROUTE);
	}
}
