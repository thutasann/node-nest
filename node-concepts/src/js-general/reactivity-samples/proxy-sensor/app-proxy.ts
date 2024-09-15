// appProxy.ts

import { AlertSystemProxy } from './alert-system-proxy';
import { ReactiveProxy } from './reactive-proxy';
import { SensorProxy } from './sensor-proxy';

// Create a sensor instance
const sensor = new SensorProxy(25, 50);

// Subscribe to changes in sensor data
const reactiveSensor = new ReactiveProxy(sensor.data);
reactiveSensor?.subscribe((newValue, oldValue, property) => {
	AlertSystemProxy.checkCriticalTemperature(property, newValue);
	AlertSystemProxy.checkCriticalHumidity(property, newValue);
	AlertSystemProxy.checkTemperatureDelta(property, oldValue, newValue);
});

// Simulate data changes over time
setTimeout(() => {
	sensor.updateData(80, 60); // Should trigger critical temperature alert
}, 1000);

setTimeout(() => {
	sensor.updateData(84, 95); // Should trigger critical humidity alert
}, 2000);

setTimeout(() => {
	sensor.updateData(74, 88); // Should trigger significant temperature change alert
}, 3000);
