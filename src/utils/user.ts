import { tokenAccessStore } from 'stores';
import { get } from 'svelte/store';
import { parseJwt } from './jwt';

export function getUserFirstName() {
	const name = getUserFullName();
	if (name == null) return null;
	let [firstName, _] = name.split(' ');
	return firstName;
}

export function getUserLastName() {
	const name = getUserFullName();
	if (name == null) return null;
	let [_, lastName] = name.split(' ');
	return lastName;
}

export function getUserFullName() {
	const token = get(tokenAccessStore);
	if (token == null) return null;
	const decodedToken = parseJwt(token);
	return decodedToken.name;
}
