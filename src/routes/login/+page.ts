import { redirect, type LoadEvent } from '@sveltejs/kit';
import type { LoginLoadProps } from 'types/loginScreens';
import { token2FAStoreKey, tokenAccessStoreKey, tokenRefreshStoreKey } from 'stores';
import { itemInSessionStorage } from 'utils/storage';
import { ACCESS_ROUTE } from 'constants/routes';

export const prerender = true;

export function load(params: LoadEvent): LoginLoadProps {
	const hasAccessToken = itemInSessionStorage(tokenAccessStoreKey);
	const hasRefreshToken = itemInSessionStorage(tokenRefreshStoreKey);

	if (hasAccessToken && hasRefreshToken) {
		throw redirect(307, ACCESS_ROUTE);
	}

	const inStorage = itemInSessionStorage(token2FAStoreKey);
	return inStorage ? { screen: 'login2FA' } : { screen: 'loginBase' };
}
