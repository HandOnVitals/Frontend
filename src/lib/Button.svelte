<script lang="ts">
	import { vitalSignTo_pt, type VitalSign } from 'constants/vitalSigns';

	export let vitalSign: VitalSign;
	export let to: string;
	export let iconSrc: string;
</script>

<a
	href={to}
	class="mr-2 mb-2 inline-flex w-full place-content-center items-center rounded-lg border border-blue-600 px-5 py-2.5 text-center text-sm font-medium text-blue-600 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
	<img class="mr-2 h-6 w-6" src={iconSrc} alt="Icon" />
	{vitalSignTo_pt(vitalSign)}
</a>
