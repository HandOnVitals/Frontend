<script lang="ts">
	import { heartRate, bloodPressure, temperature, bloodOxygen, vitalSignTo_pt, type VitalSign } from 'constants/vitalSigns';
	import { BLOOD_OXYGEN_IMAGE, BLOOD_PRESSURE_IMAGE, HEART_RATE_IMAGE, TEMPERATURE_IMAGE } from 'constants/static';
	import { BLOOD_OXYGEN_HISTORY_ROUTE, BLOOD_PRESSURE_HISTORY_ROUTE, HEART_RATE_HISTORY_ROUTE, TEMPERATURE_HISTORY_ROUTE } from 'constants/routes';
	import Navbar from 'lib/Navbar.svelte';
	import { readingsStore } from 'stores';
	import { Chart, registerables, type ChartData, type ChartOptions, type ScatterDataPoint } from 'chart.js';
	import 'chartjs-adapter-date-fns';
	import { Line } from 'svelte-chartjs';
	import { generateGraphData, generateGraphOptions } from 'utils/graph';
	import Button from 'lib/Button.svelte';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	Chart.register(...registerables);

	let vitalSign: VitalSign;
	let vitalSign_pt: string;
	let graphData: ChartData<'line', (number | ScatterDataPoint)[], unknown>;
	let graphOptions: ChartOptions<'line'>;

	const unsubscribe = page.subscribe((val) => {
		vitalSign = ($page.url.searchParams.get('vs') || heartRate) as VitalSign;
		vitalSign_pt = vitalSignTo_pt(vitalSign);
		const { labels, data } = getLabelsAndData(vitalSign);
		graphData = generateGraphData(labels, data, vitalSign_pt);
		graphOptions = generateGraphOptions(vitalSign);
	});

	onDestroy(unsubscribe);

	function getLabelsAndData(vitalSign: VitalSign) {
		let labels: string[] = [];
		let data: number[] = [];
		$readingsStore.forEach((value) => {
			labels.push(value.datetime);
			data.push(value[vitalSign]);
		});
		return { labels, data };
	}
</script>

<svelte:head>
	<title>HoV · Histórico {vitalSign_pt}</title>
</svelte:head>

<Navbar />
<main class="my-20 ml-32 mr-16 w-full">
	<section>
		<h1 class="title">Histórico</h1>
		<h2 class="subtitle mt-2">{vitalSign_pt}</h2>
	</section>
	<Line class="mt-10 max-h-[60vh]" data={graphData} options={graphOptions} />
	<div class="mt-10 flex justify-between gap-8">
		<Button vitalSign={heartRate} iconSrc={HEART_RATE_IMAGE} to={HEART_RATE_HISTORY_ROUTE} />
		<Button vitalSign={temperature} iconSrc={TEMPERATURE_IMAGE} to={TEMPERATURE_HISTORY_ROUTE} />
		<Button vitalSign={bloodPressure} iconSrc={BLOOD_PRESSURE_IMAGE} to={BLOOD_PRESSURE_HISTORY_ROUTE} />
		<Button vitalSign={bloodOxygen} iconSrc={BLOOD_OXYGEN_IMAGE} to={BLOOD_OXYGEN_HISTORY_ROUTE} />
	</div>
</main>
