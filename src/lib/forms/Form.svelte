<script type="ts">
	export let loading: boolean = false;
	export let handleSubmit: (ev: SubmitEvent) => void;
</script>

<form class="mt-12" on:submit|preventDefault={handleSubmit}>
	<div class="flex flex-col gap-4">
		<slot />
	</div>

	<button
		type="submit"
		class="mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400"
		disabled={loading}>
		Aceder
	</button>
</form>
