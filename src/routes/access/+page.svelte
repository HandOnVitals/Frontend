<script lang="ts">
	import { goto } from '$app/navigation';
	import { readingsStore } from 'stores';
	import { READING_ROUTE } from 'constants/routes';
	import CenteredMenu from 'lib/CenteredMenu.svelte';
	import Form from 'lib/forms/Form.svelte';
	import TextInput from 'lib/forms/TextInput.svelte';
	import { AccessHandler } from 'lib/forms/handlers/AccessHandler';
	import { EventError, RefreshTokenError, SubmitError, ValidationError } from 'lib/forms/errors';
	import { getUserFirstName } from 'utils/user';

	const userName = getUserFirstName();
	const title = `Bem-vindo${userName ? `, ${userName}` : ''}`;

	let formError: null | string = null;
	let loading: boolean = false;

	async function handleSubmit(ev: SubmitEvent) {
		try {
			formError = null;
			const handler = new AccessHandler(ev);
			handler.validate();
			loading = true;
			const readings = await handler.submit();
			readingsStore.set(readings);
			loading = false;
			goto(READING_ROUTE, { replaceState: true });
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
	<title>HoV · Acesso</title>
</svelte:head>

<main class="m-auto">
	<CenteredMenu bind:loading {title} subtitle="Aceda aos dados do seu utente em baixo">
		<Form bind:loading {handleSubmit}>
			<TextInput label="Número de utente de saúde" name="snsNumber" placeholder="E.x. 285102943" autofocus />

			{#if formError}
				<p class="mt-2 text-sm text-red-600">{formError}</p>
			{/if}
		</Form>
	</CenteredMenu>
</main>
