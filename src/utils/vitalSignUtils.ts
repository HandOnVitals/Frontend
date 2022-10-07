import type { VitalSign } from 'types/reading';
import { bloodOxygen, bloodPressure, heartRate, temperature } from '../constants/vitalSigns';

export function vitalSignUnit(vitalSign: VitalSign) {
	switch (vitalSign) {
		case heartRate:
			return ' rep/s';
		case temperature:
			return 'ºC';
		case bloodPressure:
			return ' mmHg';
		case bloodOxygen:
			return '%';
		default:
			return '';
	}
}

export function vitalSignColor(vitalSign: VitalSign) {
	switch (vitalSign) {
		case heartRate:
			return 'bg-red-200';
		case temperature:
			return 'bg-purple-200';
		case bloodPressure:
			return 'bg-yellow-200';
		case bloodOxygen:
			return 'bg-green-200';
		default:
			return 'bg-red-200';
	}
}
