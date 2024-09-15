import { AlertSystem } from './alert-network';
import { Sensor } from './sensor';

const sensor1 = new Sensor('LivingRoom', 22);
const sensor2 = new Sensor('Kitchen', 30);

sensor1.onTemperatureChange((newTemp) => {
	AlertSystem.checkCriticalTemperature('LivingRoom', newTemp);
});

let lastTemperatureKitchen = sensor2.getTemperature();
sensor2.onTemperatureChange((newTemp) => {
	AlertSystem.checkCriticalTemperature('Kitchen', newTemp);

	AlertSystem.checkTemperatureDelta('Kitchen', lastTemperatureKitchen, newTemp);
});

// Simulate temperature changes over time
setTimeout(() => {
	sensor1.updateTemperature(25); // No alert
	sensor2.updateTemperature(80); // Alert: Critical temperature exceeded
}, 1000);

setTimeout(() => {
	sensor1.updateTemperature(28); // No alert
	sensor2.updateTemperature(85); // Alert: Critical temperature exceeded
}, 2000);

setTimeout(() => {
	sensor1.updateTemperature(34); // Alert: Temperature changed significantly
	sensor2.updateTemperature(72); // No alert
}, 3000);
