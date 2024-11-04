/**
 * Queue Node
 * @template T - Type of the value
 * @description A node in the queue
 * @internal
 */
class QueueNode<T> {
	value: T;
	next?: QueueNode<T>;

	constructor(value: T) {
		this.value = value;
	}
}

/**
 * Queue
 * @template T - Type of the value
 * @description A queue data structure
 */
export default class Queue<T> {
	#head?: QueueNode<T>;
	#tail?: QueueNode<T>;
	#size: number;

	constructor() {
		this.clear();
	}

	/**
	 * Enqueue a value to the queue
	 * @param value - The value to enqueue
	 */
	enqueue(value: T): void {
		const node = new QueueNode(value);

		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}

		this.#size++;
	}

	/**
	 * Dequeue a value from the queue
	 * @returns The value dequeued
	 */
	dequeue(): T | undefined {
		const current = this.#head;
		if (!current) return undefined;

		this.#head = this.#head.next;
		this.#size--;
		return current.value;
	}

	/**
	 * Peek the value at the front of the queue
	 * @returns The value at the front of the queue
	 */
	peek(): T | undefined {
		return this.#head?.value;
	}

	/**
	 * Clear the queue
	 */
	clear(): void {
		this.#head = this.#tail = undefined;
		this.#size = 0;
	}

	/**
	 * Get the size of the queue
	 * @returns The size of the queue
	 */
	get size(): number {
		return this.#size;
	}

	/**
	 * Iterate over the queue
	 * @returns An iterator over the queue
	 */
	*[Symbol.iterator](): IterableIterator<T> {
		let current = this.#head;

		while (current) {
			yield current.value;
			current = current.next;
		}
	}
}
