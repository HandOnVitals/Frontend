const baseUrl = "http://localhost:8000";

export const pacientReadings = (q1: string) =>
    `${baseUrl}/pacients/${q1}/readings/`;
