export function getFormDataFromForm<FormType>(form: HTMLFormElement) {
	const formData = new FormData(form);

	const data: { [key: string]: FormDataEntryValue } = {};
	for (let field of formData) {
		const [key, value] = field;
		data[key] = value;
	}
	return data as FormType;
}
