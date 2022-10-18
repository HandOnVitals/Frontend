<script lang="ts">
	export let label: string;
	export let inputType: string = 'text';
	export let id: string = label.replaceAll(' ', '-').toLowerCase();
	export let name: string = id;
	export let placeholder: string = '';
	export let autofocus: boolean = false;
</script>

<div>
	<label for={id} class="mb-2 block text-sm font-medium text-gray-900">{label}</label>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		type={inputType}
		{id}
		{name}
		class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
		{placeholder}
		{autofocus} />
</div>
