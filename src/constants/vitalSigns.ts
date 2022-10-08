export const heartRate_pt = 'Frequência cardíaca';
export const bloodPressure_pt = 'Pressão arterial';
export const temperature_pt = 'Temperatura corporal';
export const bloodOxygen_pt = 'Oximetria';

export const heartRate_en = 'Heart rate';
export const bloodPressure_en = 'Pressão arterial';
export const temperature_en = 'Temperatura corporal';
export const bloodOxygen_en = 'Oximetria';

export const heartRate: VitalSign = 'heartRate';
export const bloodPressure: VitalSign = 'bloodPressure';
export const temperature: VitalSign = 'temperature';
export const bloodOxygen: VitalSign = 'bloodOxygen';

export type VitalSign = 'heartRate' | 'bloodPressure' | 'temperature' | 'bloodOxygen';

export function vitalSignTo_pt(vitalSign: VitalSign) {
	switch (vitalSign) {
		case heartRate:
			return heartRate_pt;
		case bloodPressure:
			return bloodPressure_pt;
		case temperature:
			return temperature_pt;
		case bloodOxygen:
			return bloodOxygen_pt;
		default:
			return '';
	}
}

export function vitalSignTo_en(vitalSign: VitalSign) {
	switch (vitalSign) {
		case heartRate:
			return heartRate_en;
		case bloodPressure:
			return bloodPressure_en;
		case temperature:
			return temperature_en;
		case bloodOxygen:
			return bloodOxygen_en;
		default:
			return '';
	}
}
