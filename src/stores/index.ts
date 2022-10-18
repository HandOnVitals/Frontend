import type { Token2FA } from 'types/forms';
import type { Reading } from 'types/reading';
import { writable as sessionStorageWritable } from 'utils/sessionStorageStore';
// import { writable as localStorageWritable } from 'utils/localStorageStore';

export const readingStoreKey = 'readings';
export const readingsStore = sessionStorageWritable<Reading[]>(readingStoreKey, []);

export const token2FAStoreKey = 'token-2FA';
export const token2FAStore = sessionStorageWritable<string | null>(token2FAStoreKey, null);

export const tokenAccessStoreKey = 'token-access';
export const tokenAccessStore = sessionStorageWritable<string | null>(tokenAccessStoreKey, null);

export const tokenRefreshStoreKey = 'token-refresh';
export const tokenRefreshStore = sessionStorageWritable<string | null>(tokenRefreshStoreKey, null);
