/** Subscriber Type Alias */
type Subscriber<T> = (newValue: T) => void;

/** Reactive */
class Reactive<T> {
	private value: T;
	private subscribers: Subscriber<T>[] = [];

	constructor(initialValue: T) {
		this.value = initialValue;
	}

	/** subscribe to changes */
	subscribe(subscriber: Subscriber<T>): void {
		this.subscribers.push(subscriber);
	}

	/** update the value and notify subscribers */
	set(newValue: T): void {
		if (newValue !== this.value) {
			this.value = newValue;
			this.notifySubscribers();
		}
	}

	/** get the current value */
	get(): T {
		return this.value;
	}

	/** notify all subscribers when the value changes */
	private notifySubscribers(): void {
		this.subscribers.forEach((subscriber) => subscriber(this.value));
	}
}

const reactiveNumber = new Reactive(10);

reactiveNumber.subscribe((newValue) => {
	console.log(`The new value is: ${newValue}`);
});

reactiveNumber.set(20);
reactiveNumber.set(30);

console.log(`Current value: ${reactiveNumber.get()}`); // Output: Current value: 30
