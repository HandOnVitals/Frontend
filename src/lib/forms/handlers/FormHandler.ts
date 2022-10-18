import { getFormDataFromForm } from 'utils/forms';
import type { SubmitError } from '../errors/SubmitError';
import type { ValidationError } from '../errors/ValidationError';

export class FormHandler<FormType, EndpointReturnType> {
	event: SubmitEvent;
	formData: FormType;

	/**
	 * @throws {Error}
	 */
	constructor(event: SubmitEvent) {
		this.event = event;
		if (!this.event.target) {
			throw 'Erro ao submeter o formulário';
		}
		this.formData = getFormDataFromForm<FormType>(this.event.target as HTMLFormElement);
	}

	/**
	 * @throws {ValidationError}
	 */
	validate(): void {}

	/**
	 * @throws {SubmitError}
	 */
	async submit(): Promise<EndpointReturnType> {
		return new Promise(() => {});
	}
}
