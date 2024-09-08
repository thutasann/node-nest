interface PriorityQueueHeap<T> {
	element: T;
	priority: number;
}

/** Priority Queue */
class PriorityQueue<T> {
	private heap: Array<PriorityQueueHeap<T>> = [];

	/** Get the index of the parent of the given index */
	private parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	/** Get the index of the left child of the given index */
	private leftChild(index: number): number {
		return 2 * index + 1;
	}

	/** Get the index of the right child of the given index */
	private rightChild(index: number): number {
		return 2 * index + 2;
	}

	/** Swap the elements at indices `i` and `j` */
	private swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	/** Heapify up to ensure the max-heap property is maintained */
	private heapifyUp(index: number): void {
		let currentIndex = index;
		while (
			currentIndex > 0 &&
			this.heap[currentIndex] > this.heap[this.parent(currentIndex)]
		) {
			this.swap(currentIndex, this.parent(currentIndex));
		}
	}

	/** Heapify down to ensure the max-heap property is maintained */
	private heapifyDown(index: number): void {
		let largest = index;
		const left = this.leftChild(index);
		const right = this.rightChild(index);

		if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
			largest = left;
		}

		if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
			largest = right;
		}

		if (largest !== index) {
			this.swap(index, largest);
			this.heapifyDown(largest);
		}
	}

	/** enqueue */
	public enqueue(element: T, priority: number): void {
		this.heap.push({ element, priority });
		this.heapifyUp(this.heap.length - 1);
	}

	/** dequeue */
	public dequeue(): T | undefined {
		if (this.heap.length === 0) return undefined;
		if (this.heap.length === 1) return this.heap.pop().element;

		const max = this.heap[0].element;
		this.heap[0] = this.heap.pop();
		this.heapifyDown(0);

		return max;
	}

	/** peek */
	public peek(): T | undefined {
		return this.heap.length > 0 ? this.heap[0].element : undefined;
	}
}

const taskQueue = new PriorityQueue<string>();

taskQueue.enqueue('Low priority task', 1);
taskQueue.enqueue('Medium priority task', 2);
taskQueue.enqueue('High priority task', 3);

console.log(taskQueue.peek());
console.log(taskQueue.dequeue());
console.log(taskQueue.dequeue());
console.log(taskQueue.dequeue());
