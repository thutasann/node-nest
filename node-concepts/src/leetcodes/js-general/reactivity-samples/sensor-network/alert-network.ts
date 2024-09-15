export class AlertSystem {
	public static checkCriticalTemperature(
		sensorId: string,
		temperature: number,
	) {
		console.log('checkCriticalTemperature...');
		if (temperature > 75) {
			console.log(
				`[ALERT] Sensor ${sensorId}: Critical temperature (${temperature}°C) exceeded!\n`,
			);
		}
	}

	public static checkTemperatureDelta(
		sensorId: string,
		oldTemp: number,
		newTemp: number,
	) {
		console.log('checkTemperatureDelta...');
		const delta = Math.abs(newTemp - oldTemp);
		if (delta >= 5) {
			console.log(
				`[ALERT] Sensor ${sensorId}: Temperature changed significantly by ${delta}°C.\n`,
			);
		}
	}
}
