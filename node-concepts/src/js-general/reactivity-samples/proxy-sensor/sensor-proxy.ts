import { ReactiveProxy } from './reactive-proxy';

type TemperatureData = { temperature: number; humidity: number };

export class SensorProxy {
	public data: TemperatureData;

	constructor(initialTemperature: number, initialHumidity: number) {
		// Use Proxy to monitor changes on the data object
		// @ts-ignore
		this.data = new ReactiveProxy<{ temperature: number; humidity: number }>({
			temperature: initialTemperature,
			humidity: initialHumidity,
		});
	}

	/** Simulate sensor data updates */
	updateData(newTemperature: number, newHumidity: number) {
		console.log(`[Sensor] Updating data...`);
		this.data.temperature = newTemperature;
		this.data.humidity = newHumidity;
	}
}
