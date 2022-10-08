<script lang="ts">
	export let dates: Date[];
	export let setCurrentReading: Function;
	export let searchOpen = false;

	import Flatpickr from 'svelte-flatpickr';
	import { isEqual, isSameDay } from 'date-fns';
	import { Portuguese } from 'flatpickr/dist/l10n/pt.js';
	import 'flatpickr/dist/flatpickr.css';

	const options = {
		maxDate: 'today',
		dateFormat: 'd-m-Y',
		element: '#my-picker',
		enableTime: false,
		enable: dates,
		locale: Portuguese
	};

	// Value binded to Flatpickr date picker
	let dateValue: Date;
	// Value binded to <Select> with times. The option's value is the Date (with date and time) object
	let dateTimeValue: Date;

	function dateTimeToIndex() {
		const index = dates.findIndex((value) => isEqual(value, dateTimeValue));
		setCurrentReading(index);
		searchOpen = false;
	}

	$: availableDates = dates.filter((date) => isSameDay(dateValue, date));
</script>

<div class:hidden={searchOpen === false} class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

	<div class="fixed inset-0 z-10 overflow-y-auto">
		<div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
			<div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
				<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
							<h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Selecionar uma leitura</h3>
							<div class="mt-6">
								<Flatpickr {options} bind:value={dateValue} name="date" element="#my-picker">
									<div class="flatpickr relative" id="my-picker">
										<input
											class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
											type="text"
											placeholder="Escolha uma data..."
											data-input />
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-2 right-2 h-6 w-6 fill-transparent stroke-gray-600">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
										</svg>
									</div></Flatpickr>

								<div class="relative">
									<select
										bind:value={dateTimeValue}
										class="mt-2 block w-full appearance-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500">
										<option selected disabled>Escolha uma hora...</option>
										{#if !dateValue}
											<option disabled>Escolha uma data primeiro!</option>
										{/if}
										{#each availableDates as date}
											<option value={date}>{`${date.getUTCHours()}h:${date.getUTCMinutes()}m:${date.getUTCSeconds()}`}s</option>
										{/each}
									</select>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="absolute top-2 right-2 h-6 w-6 fill-transparent stroke-gray-600">
										<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={() => {
							dateTimeToIndex();
						}}>Obter leitura</button>
					<button
						type="button"
						class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={() => (searchOpen = false)}>Cancelar</button>
				</div>
			</div>
		</div>
	</div>
</div>
