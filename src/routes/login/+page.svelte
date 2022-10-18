<script lang="ts">
	import { token2FAStore, tokenAccessStore, tokenRefreshStore } from 'stores';
	import CenteredMenu from 'lib/CenteredMenu.svelte';
	import Form from 'lib/forms/Form.svelte';
	import TextInput from 'lib/forms/TextInput.svelte';
	import type { LoginLoadProps } from 'types/loginScreens';
	import OtpInput from 'lib/forms/OTPInput.svelte';
	import { ValidationError, EventError, SubmitError } from 'lib/forms/errors';
	import { LoginBaseHandler, Login2FAHandler } from 'lib/forms/handlers';
	import { goto } from '$app/navigation';
	import { ACCESS_ROUTE } from 'constants/routes';
	import PrimaryButton from 'lib/buttons/PrimaryButton.svelte';
	import LinkButton from 'lib/buttons/LinkButton.svelte';

	let formError: null | string = null;
	let loading: boolean = false;
	export let data: LoginLoadProps = { screen: 'loginBase' };

	async function handleLoginBaseSubmit(ev: SubmitEvent) {
		try {
			formError = null;
			const handler = new LoginBaseHandler(ev);
			handler.validate();
			loading = true;
			const token = await handler.submit();
			token2FAStore.set(token['2faAccess']);
			loading = false;
			data.screen = 'login2FA';
		} catch (error) {
			// Could add error below form field with validation error
			if (error instanceof EventError || error instanceof ValidationError || error instanceof SubmitError) {
				formError = error.message;
			}
		} finally {
			loading = false;
		}
	}

	async function handleLogin2FASubmit(ev: SubmitEvent) {
		try {
			formError = null;
			const handler = new Login2FAHandler(ev);
			handler.validate();
			loading = true;
			const tokens = await handler.submit();
			tokenAccessStore.set(tokens.access);
			tokenRefreshStore.set(tokens.refresh);
			token2FAStore.set(null);
			loading = false;
			goto(ACCESS_ROUTE);
		} catch (error) {
			// Could add error below form field with validation error
			if (error instanceof EventError || error instanceof ValidationError || error instanceof SubmitError) {
				formError = error.message;
			}
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>HoV · Login</title>
</svelte:head>

<main class="m-auto">
	<CenteredMenu
		bind:loading
		title="Entrar"
		subtitle={data.screen === 'login2FA' ? 'Introduza o código que recebeu no seu e-mail em baixo' : 'Introduza os seus dados de acesso em baixo'}>
		{#if data.screen === 'login2FA'}
			<Form bind:loading handleSubmit={handleLogin2FASubmit}>
				<OtpInput />

				{#if formError}
					<p class="mt-2 text-sm text-red-600">{formError}</p>
				{/if}
			</Form>
			<LinkButton bind:loading text="Re-enviar código" />
		{:else}
			<Form bind:loading handleSubmit={handleLoginBaseSubmit}>
				<TextInput label="Email" placeholder="E.x. email@om.pt" autofocus />
				<TextInput label="Password" inputType="password" />

				{#if formError}
					<p class="mt-2 text-sm text-red-600">{formError}</p>
				{/if}
			</Form>
		{/if}
	</CenteredMenu>
</main>
