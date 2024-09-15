import { ReactiveProxy } from './reactive-proxy';

type TemperatureData = { temperature: number; humidity: number };

export class SensorProxy {
	public data: TemperatureData = { temperature: 0, humidity: 0 };

	constructor(initialTemperature: number, initialHumidity: number) {
		// Use Proxy to monitor changes on the data object
		this.data = new ReactiveProxy<{ temperature: number; humidity: number }>({
			temperature: initialTemperature,
			humidity: initialHumidity,
		}) as unknown as TemperatureData;
	}

	/** Simulate sensor data updates */
	updateData(newTemperature: number, newHumidity: number) {
		console.log(`[Sensor] Updating data...`);
		this.data.temperature = newTemperature;
		this.data.humidity = newHumidity;
	}
}
