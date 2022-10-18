import { LOGIN_BASE_URL } from 'constants/endpoints';
import { HTTPError } from 'ky';
import type { LoginBaseFormData, Token2FA } from 'types/forms';
import { unauthRequest } from 'utils/requests';
import { SubmitError } from '../errors';
import { ValidationError } from '../errors/ValidationError';
import { FormHandler } from './FormHandler';

export class LoginBaseHandler extends FormHandler<LoginBaseFormData, Token2FA> {
	validate(): void {
		if (this.formData.email === '' || this.formData.password === '') {
			throw new ValidationError('Por favor preencha todos os campos');
		}

		if (!this.formData.email.match(/[^@]+@[^@]+/)) {
			throw new ValidationError('Por favor introduza um endereço de email válido');
		}
	}

	async submit(): Promise<Token2FA> {
		try {
			const response = await unauthRequest.post(LOGIN_BASE_URL, { json: this.formData }).json<Token2FA>();
			return response;
		} catch (error) {
			if (error instanceof HTTPError) {
				const status = error.response.status;
				if (status === 401) {
					throw new SubmitError('Credenciais erradas. Por favor tente novamente.');
				} else {
					throw new SubmitError('Erro ao obter dados do servidor. Por favor tente novamente.');
				}
			} else {
				// Happens when error instanceof TypeError, which is when the server is turned off
				// Also happens on TimeoutError, which is when the timeout is exceeded
				throw new SubmitError('Erro ao comunicar com o servidor. Por favor tente novamente mais tarde');
			}
		}
	}
}
