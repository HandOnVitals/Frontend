interface Scores {
	name: string;
	value: number;
	spec: string;
}

export interface Reading {
	datetime: string;
	temperature: number;
	heartRate: number;
	respiratoryRate: number;
	bloodOxygen: number;
	bloodPressure: number;
	scores: Scores[];
}

export type VitalSign = 'heartRate' | 'bloodPressure' | 'temperature' | 'bloodOxygen';
