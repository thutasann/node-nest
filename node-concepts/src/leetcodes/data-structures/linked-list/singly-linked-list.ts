/** Customer Node in Singly Linked List */
class Customer {
	name: string;
	next: Customer | null;

	constructor(name: string) {
		this.name = name;
	}
}

/** Singly Linked List Implementation (Call Center Queue) */
class CallCenterQueue {
	private head: Customer | null = null;
	private tail: Customer | null = null;

	/** Add Customer to the Queue (enqueue) */
	addCustomer(name: string): void {
		const newCustomer = new Customer(name);

		// link the new customer to the end
		if (this.tail) this.tail.next = newCustomer;

		// set the new customer as the last node
		this.tail = newCustomer;

		// if the list was empty, set the new customer as the head
		if (!this.head) this.head = newCustomer;

		console.log(`${name} has been added to the call center queue.`);
	}

	/** Serve the customer at the front of the queue (queue) */
	serveCustomer(): string | null {
		if (!this.head) {
			console.log('No Customers in the queue');
			return null;
		}

		const customerName = this.head.name;
		this.head = this.head.next;

		if (!this.head) {
			// If the queue is empty, set tail to null as well
			this.tail = null;
		}

		console.log(`${customerName} is being served.`);

		return customerName;
	}

	/** Display Queue */
	displayQueue(): void {
		if (!this.head) {
			console.log('The queue is empty');
			return;
		}

		let current = this.head;
		const customers: string[] = [];

		while (current) {
			customers.push(current.name);
			current = current.next;
		}

		console.log('Current Queue: ', customers.join(' -> '));
	}
}

const callQueue = new CallCenterQueue();

callQueue.addCustomer('John');
callQueue.addCustomer('Emma');
callQueue.addCustomer('Alex');

callQueue.displayQueue();
callQueue.serveCustomer();

callQueue.displayQueue();
callQueue.serveCustomer();

callQueue.displayQueue();
