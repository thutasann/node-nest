import { ReactiveSensor } from './reactive-sensor';

export class Sensor {
	private temperature: ReactiveSensor<number>;

	constructor(
		private id: string,
		initialTemperature: number,
	) {
		this.temperature = new ReactiveSensor<number>(initialTemperature);
	}

	public updateTemperature(newTemp: number) {
		console.log(`[Sensor ${this.id}] New temperature: ${newTemp}°C`);
		this.temperature.set(newTemp);
	}

	public onTemperatureChange(callback: (temp: number) => void) {
		this.temperature.subscribe(callback);
	}

	public getTemperature(): number {
		return this.temperature.get();
	}
}
