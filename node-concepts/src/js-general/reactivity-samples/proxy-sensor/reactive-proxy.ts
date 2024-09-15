type ProxySubscriber<T> = (newValue: T, oldValue: T, property: string) => void;

/** Reactive Proxy */
export class ReactiveProxy<T extends object> {
	private subscribers: ProxySubscriber<T>[] = [];

	constructor(private target: T) {
		this.createProxy(target);
	}

	/** subscribe to changes */
	public subscribe(subscriber: ProxySubscriber<T>): void {
		this.subscribers.push(subscriber);
	}

	/** create a proxy to watch for changes */
	private createProxy(target: T) {
		return new Proxy(target, {
			set: (obj, property: string, value) => {
				const oldValue = obj[property as keyof T];
				obj[property as keyof T] = value;

				if (oldValue !== value) {
					this.notifySubscribers(value, oldValue, property);
				}

				return true;
			},
		});
	}

	/** notify all subscribers */
	private notifySubscribers(newValue: any, oldValue: any, property: string) {
		this.subscribers.forEach((subscriber) =>
			subscriber(newValue, oldValue, property),
		);
	}
}
