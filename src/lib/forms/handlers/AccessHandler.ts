import { defaultNetworkTimeout } from 'constants/configs';
import { LOGIN_2FA_URL, pacientReadings } from 'constants/endpoints';
import ky, { HTTPError } from 'ky';
import { token2FAStore } from 'stores';
import type { AccessFormData } from 'types/forms';
import type { Reading } from 'types/reading';
import { authRequest } from 'utils/requests';
import { RefreshTokenError, SubmitError } from '../errors';
import { ValidationError } from '../errors/ValidationError';
import { fieldEmpty } from '../validators/requiredField';
import { FormHandler } from './FormHandler';

export class AccessHandler extends FormHandler<AccessFormData, Reading[]> {
	validate(): void {
		const snsNumber = this.formData.snsNumber;
		if (fieldEmpty(snsNumber) || !snsNumber.match(/^[0-9]{9}/)) {
			throw new ValidationError('Por favor introduza um número de utente válido');
		}
	}

	async submit(): Promise<Reading[]> {
		try {
			const snsNumber = this.formData.snsNumber;
			const response = await authRequest(pacientReadings(snsNumber)).json<Reading[]>();
			return response;
		} catch (error: unknown) {
			if (error instanceof HTTPError) {
				const status = error.response.status;
				if (status === 404) {
					throw new SubmitError('Não existe nenhum utente no sistema com o número SNS introduzido');
				} else {
					throw new SubmitError('Erro ao obter dados do utente. Por favor tente outra vez');
				}
			} else {
				// Happens when error instanceof TypeError, which is when the server is turned off
				// Also happens on TimeoutError, which is when the timeout is exceeded
				throw new SubmitError('Erro ao comunicar com o servidor. Por favor tente novamente mais tarde');
			}
		}
	}
}
