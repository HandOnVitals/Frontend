export function fieldsEmpty(fields: string[]) {
	for (let i = 0; i < fields.length; i++) {
		if (fieldEmpty(fields[i])) return true;
	}
	return false;
}

export function fieldEmpty(field: string) {
	if (!field || field === '') return true;
	return false;
}
