export class AlertSystemProxy {
	// Alert when temperature exceeds a critical threshold
	static checkCriticalTemperature(property: any, value: any) {
		if (property === 'temperature' && value > 75) {
			console.log(`[ALERT] Critical temperature (${value}°C) exceeded!`);
		}
	}

	// Alert when humidity exceeds a critical threshold
	static checkCriticalHumidity(property: any, value: any) {
		if (property === 'humidity' && value > 90) {
			console.log(`[ALERT] Critical humidity (${value}%) exceeded!`);
		}
	}

	// Alert when temperature changes significantly
	static checkTemperatureDelta(property: any, oldValue: any, newValue: any) {
		if (property === 'temperature' && Math.abs(newValue - oldValue) >= 5) {
			console.log(
				`[ALERT] Temperature changed significantly by ${Math.abs(newValue - oldValue)}°C.`,
			);
		}
	}
}
