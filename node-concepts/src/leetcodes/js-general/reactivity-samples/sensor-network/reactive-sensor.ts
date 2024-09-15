type SensorSubscriber<T> = (newValue: T) => void;

/** Reactive Sensor */
export class ReactiveSensor<T> {
	private value: T;
	private subscribers: SensorSubscriber<T>[] = [];

	constructor(newValue: T) {
		this.value = newValue;
	}

	subscribe(subscriber: SensorSubscriber<T>) {
		this.subscribers.push(subscriber);
	}

	set(newValue: T): void {
		if (this.value !== newValue) {
			this.value = newValue;
			this.notifySubscribers();
		}
	}

	get(): T {
		return this.value;
	}

	private notifySubscribers(): void {
		this.subscribers.forEach((subscriber) => subscriber(this.value));
	}
}
