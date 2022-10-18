import { defaultNetworkTimeout } from 'constants/configs';
import { REFRESH_TOKEN_URL } from 'constants/endpoints';
import ky from 'ky';
import { RefreshTokenError } from 'lib/forms/errors';
import { tokenAccessStore, tokenRefreshStore } from 'stores';
import { get } from 'svelte/store';
import type { RefreshToken } from 'types/forms';

const baseUrl = 'http://localhost:8000';

const baseRequest = ky.create({ timeout: defaultNetworkTimeout, prefixUrl: baseUrl });

export const unauthRequest = baseRequest;

const refreshToken = get(tokenRefreshStore);

export const authRequest = baseRequest.extend({
	retry: {
		statusCodes: [401, 408, 413, 429, 500, 502, 503, 504]
	},
	hooks: {
		beforeRequest: [
			(request) => {
				const accessToken = get(tokenAccessStore);
				request.headers.set('Authorization', `Bearer ${accessToken}`);
			}
		],
		beforeRetry: [
			async ({ request, options, error, retryCount }) => {
				// Get new access token if expired
				try {
					const token = await baseRequest
						.post(REFRESH_TOKEN_URL, {
							json: {
								refresh: refreshToken
							}
						})
						.json<RefreshToken>();
					tokenAccessStore.set(token.access);
					request.headers.set('Authorization', `Bearer ${token.access}`);
				} catch (error) {
					// By setting these to null, the layout.svelte file will redirect to the login page
					tokenAccessStore.set(null);
					tokenRefreshStore.set(null);
					throw new RefreshTokenError('Failed refreshing token');
				}
			}
		]
	}
});
