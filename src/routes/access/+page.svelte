<script lang="ts">
	import ky, { HTTPError } from 'ky';
	import { goto } from '$app/navigation';
	import { defaultNetworkTimeout } from 'constants/configs';
	import { pacientReadings } from 'constants/endpoints';
	import { readingsStore } from 'stores';
	import type { Reading } from 'types/reading';
	import { READING_ROUTE } from 'constants/routes';

	let formError: null | string = null;
	let loading: boolean = false;

	async function handleSubmit(ev: SubmitEvent) {
		// @ts-ignore
		const value = ev.target[0].value as string;
		if (value == '') {
			formError = 'Por favor introduza um número de utente';
			return;
		}
		if (!value.match(/^[0-9]{9}/)) {
			formError = 'Por favor introduza um número de utente válido (deve conter 9 digitos)';
			return;
		}

		formError = null;
		loading = true;
		try {
			const response = await ky
				.get(pacientReadings(value), {
					timeout: defaultNetworkTimeout
				})
				.json<Reading[]>();
			loading = false;

			readingsStore.set(response);
			goto(READING_ROUTE);
		} catch (error: unknown) {
			if (error instanceof HTTPError) {
				const status = error.response.status;
				if (status === 404) {
					formError = 'Não existe nenhum utente no sistema com o número SNS introduzido';
				} else {
					formError = 'Erro ao obter dados do utente. Por favor tente outra vez';
				}
			} else {
				// Happens when error instanceof TypeError, which is when the server is turned off
				// Also happens on TimeoutError, which is when the timeout is exceeded
				formError = 'Erro ao comunicar com o servidor. Por favor tente novamente mais tarde';
			}
			loading = false;
		}
	}
</script>

<main class="m-auto">
	<div class="relative max-w-sm rounded-lg bg-white p-10 shadow-sm">
		<div class:blur-sm={loading}>
			<h1 class="title">Bem-vindo, João!</h1>
			<h2 class="subtitle mt-2">Aceda aos dados do seu utente em baixo</h2>
			<form class="mt-12" on:submit|preventDefault={handleSubmit}>
				<div>
					<label for="sns-number" class="mb-2 block text-sm font-medium text-gray-900">Número SNS do utente</label>
					<!-- svelte-ignore a11y-autofocus -->
					<input
						type="text"
						id="sns-number"
						disabled={loading}
						class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
						placeholder="E.x. 285102943"
						autofocus />
				</div>

				{#if formError}
					<p class="mt-2 text-sm text-red-600">{formError}</p>
				{/if}

				<button
					type="submit"
					class="mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400"
					disabled={loading}>
					Aceder
				</button>
			</form>
		</div>

		{#if loading}
			<div role="status" class="absolute-center">
				<p class="text-lg font-semibold">A carregar...</p>
				<svg
					aria-hidden="true"
					class="mx-auto mt-2 h-8 w-8 animate-spin fill-blue-600 text-gray-400"
					viewBox="0 0 100 101"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor" />
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill" />
				</svg>
			</div>
		{/if}
	</div>
</main>
