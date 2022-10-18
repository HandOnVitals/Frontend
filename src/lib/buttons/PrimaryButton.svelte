<script lang="ts">
	export let loading: boolean;
	export let text: string;
	export let type: string;
</script>

<button
	{type}
	class="mt-4 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-400"
	disabled={loading}>
	{text}
</button>
