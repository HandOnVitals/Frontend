import { LOGIN_2FA_URL } from 'constants/endpoints';
import { HTTPError } from 'ky';
import { token2FAStore } from 'stores';
import { get } from 'svelte/store';
import type { Login2FAFormData, TokensAccess } from 'types/forms';
import { unauthRequest } from 'utils/requests';
import { SubmitError } from '../errors';
import { ValidationError } from '../errors/ValidationError';
import { fieldsEmpty } from '../validators/requiredField';
import { FormHandler } from './FormHandler';

export class Login2FAHandler extends FormHandler<Login2FAFormData, TokensAccess> {
	validate(): void {
		const digitsArray: string[] = Object.values(this.formData);
		if (fieldsEmpty(digitsArray)) {
			throw new ValidationError('Por favor introduza os 6 digitos');
		}
	}

	async submit(): Promise<TokensAccess> {
		try {
			const code = Object.values(this.formData).join('');
			const token = get(token2FAStore);
			const response = await unauthRequest
				.post(LOGIN_2FA_URL, {
					json: { code },
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.json<TokensAccess>();
			return response;
		} catch (error) {
			if (error instanceof HTTPError) {
				const status = error.response.status;
				if (status === 400) {
					throw new SubmitError('Código errado. Por favor tente novamente.');
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
