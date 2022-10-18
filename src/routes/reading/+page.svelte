<script lang="ts">
	import Navbar from 'lib/Navbar.svelte';
	import Card from 'lib/Card.svelte';
	import { readingsStore } from 'stores';
	import { BLOOD_OXYGEN_IMAGE, BLOOD_PRESSURE_IMAGE, TEMPERATURE_IMAGE } from 'constants/static';
	import { bloodOxygen, bloodPressure, heartRate, temperature } from 'constants/vitalSigns';
	import { pt } from 'date-fns/locale';
	import { format, formatDistanceToNow } from 'date-fns';
	import DateTimeModal from 'lib/DateTimeModal.svelte';
	import SearchButton from 'lib/SearchButton.svelte';

	let searchOpen = false;
	const dates = $readingsStore.map((value) => new Date(value.datetime));

	let currentReadingIndex = 0;
	$: readingDate = new Date($readingsStore[currentReadingIndex].datetime);

	function setCurrentReading(id: number) {
		currentReadingIndex = id;
	}

	$: readingTitle = generateReadingTitle(currentReadingIndex);

	function generateReadingTitle(index: number) {
		if (index === 0) return 'Última leitura';
		else return `Leitura de ${format(readingDate, "dd-MM-yyyy 'às' HH'h':mm'm':ss's'")}`;
	}
</script>

<svelte:head>
	<title>HoV · Leituras</title>
</svelte:head>

<Navbar />
<!-- mx-16 makes text aligned with nav -->
<main class="my-20 ml-32 mr-16 w-full">
	<DateTimeModal {dates} bind:searchOpen {setCurrentReading} />
	<section class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-0">
		<div>
			<h1 class="title">{readingTitle}</h1>
			<h2 class="subtitle mt-2 capitalize-first">
				{formatDistanceToNow(readingDate, { addSuffix: true, locale: pt })}
			</h2>
		</div>
		<SearchButton on:click={() => (searchOpen = true)} />
	</section>
	<!-- <section class="mt-20 flex justify-between gap-4 md:gap-10"> -->
	<section class="mt-20 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
		<Card
			vitalSign={heartRate}
			currentAmount={$readingsStore[currentReadingIndex].heartRate}
			showVariation={currentReadingIndex === 0}
			variation={$readingsStore[0].heartRate - $readingsStore[1].heartRate}
			imageSrc={BLOOD_OXYGEN_IMAGE} />
		<Card
			vitalSign={temperature}
			currentAmount={$readingsStore[currentReadingIndex].temperature}
			showVariation={currentReadingIndex === 0}
			variation={$readingsStore[0].temperature - $readingsStore[1].temperature}
			imageSrc={TEMPERATURE_IMAGE} />
		<Card
			vitalSign={bloodPressure}
			currentAmount={$readingsStore[currentReadingIndex].bloodPressure}
			showVariation={currentReadingIndex === 0}
			variation={$readingsStore[0].bloodPressure - $readingsStore[1].bloodPressure}
			imageSrc={BLOOD_PRESSURE_IMAGE} />
		<Card
			vitalSign={bloodOxygen}
			currentAmount={$readingsStore[currentReadingIndex].bloodOxygen}
			showVariation={currentReadingIndex === 0}
			variation={$readingsStore[0].bloodOxygen - $readingsStore[1].bloodOxygen}
			imageSrc={BLOOD_OXYGEN_IMAGE} />
	</section>
	<section class="mt-20 flex justify-center rounded-xl bg-white p-6">
		<p class="ml-auto text-2xl font-black">Score: <span class="text-green-400">95/100</span></p>
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-auto h-8 w-8">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
		</svg>
	</section>
</main>
