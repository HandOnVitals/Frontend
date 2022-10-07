import type { ChartOptions, TooltipItem, ChartData } from 'chart.js';
import { vitalSignUnit } from './vitalSignUtils';
import { pt } from 'date-fns/locale';
import type { VitalSign } from 'constants/vitalSigns';

export function generateGraphData(labels: string[], data: number[], label: string): ChartData<'line'> {
	return {
		labels: labels,
		datasets: [
			{
				label: label,
				data: data,
				fill: false,
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointRadius: 1,
				pointHoverBorderWidth: 2,
				pointHitRadius: 10,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};
}

export function generateGraphOptions(vitalSign: VitalSign): ChartOptions<'line'> {
	return {
		scales: {
			y: {
				ticks: {
					callback: function (value: string) {
						return value + vitalSignUnit(vitalSign);
					}
				}
			},
			x: {
				type: 'time',
				time: {
					tooltipFormat: 'dd/MM/yyyy HH:mm'
				},
				adapters: {
					date: {
						locale: pt
					}
				}
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				displayColors: false,
				callbacks: {
					title: function (items: TooltipItem<'line'>[]) {
						return `Leitura de ${items[0].chart.data.datasets[0].label}`;
					},
					label: function (item: TooltipItem<'line'>) {
						return `Valor: ${item.formattedValue}${vitalSignUnit(vitalSign)}`;
					},
					afterLabel: function (item: TooltipItem<'line'>) {
						return `Data: ${item.label}`;
					}
				}
			}
		}
	};
}
