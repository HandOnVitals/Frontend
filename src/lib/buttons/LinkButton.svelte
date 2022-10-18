<script lang="ts">
	export let loading: boolean;
	export let text: string;
	export let type: string = 'button';
</script>

<button {type} class="mt-4 w-full text-center text-sm hover:text-blue-600 focus:text-blue-800 disabled:text-gray-500" disabled={loading}>
	{text}
</button>
