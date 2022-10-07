export interface Reading {
	datetime: string;
	temperature: number;
	heartRate: number;
	respiratoryRate: number;
	bloodOxygen: number;
	bloodPressure: number;
}

export type VitalSign = 'heartRate' | 'bloodPressure' | 'temperature' | 'bloodOxygen';
