export function itemInSessionStorage(key: string) {
	return itemInStorage(sessionStorage, key);
}

function itemInStorage(storage: Storage, key: string) {
	const item = storage.getItem(key);
	if (item == null) return false;
	return item !== '' && item !== '[]' && item !== 'null' && item !== 'undefined' && item !== 'NaN';
}
