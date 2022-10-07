<script lang="ts">
	export let vitalSign: VitalSign;
	export let currentAmount: number;
	export let variation: number;
	export let imageSrc: string;
	// Variation only shown in the last reading
	export let showVariation: boolean;

	import { vitalSignColor, vitalSignUnit } from 'utils/vitalSignUtils';
	import { vitalSignTo_pt, type VitalSign } from 'constants/vitalSigns';

	const unit = vitalSignUnit(vitalSign);
</script>

<div class="flex w-full max-w-sm flex-col items-center justify-between gap-4 rounded-xl bg-white px-6 py-10 text-center">
	<div class={`rounded-full ${vitalSignColor(vitalSign)} p-2 w-16`}>
		<img src={imageSrc} alt="Icon" />
	</div>
	<div>
		<h3 class="text-lg font-black">{currentAmount.toFixed(1)} {unit}</h3>
		<h4 class="text-sm font-light">{vitalSignTo_pt(vitalSign)}</h4>
	</div>
	{#if showVariation}
		<div class="flex gap-2">
			{#if variation != 0}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class={`w-6 h-6 stroke-blue-500 stroke-2 ${variation < 0 ? 'rotate-180' : ''}`}>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
				</svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 stroke-blue-500 stroke-2 ">
					<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0" />
				</svg>
			{/if}
			<p class="font-black text-blue-500">{variation.toFixed(1)} {unit}</p>
		</div>
	{/if}
</div>

<!-- <style>
	.logo {
	  height: 6em;
	  padding: 1.5em;
	  will-change: filter;
	}
	.logo:hover {
	  filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
	  filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.read-the-docs {
	  color: #888;
	}
  </style> -->
