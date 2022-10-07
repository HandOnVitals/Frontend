import type { Reading } from 'types/reading';
import { writable as sessionStorageWritable } from 'utils/sessionStorageStore';
import { writable } from 'svelte/store';

export const readingStoreKey = 'readings';
export const readingsStore = sessionStorageWritable<Reading[]>(readingStoreKey, []);

// export const modalStore = writable<boolean>(false);
