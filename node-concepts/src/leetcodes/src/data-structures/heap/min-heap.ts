/**
 * ### Min Heap Implementation
 * - its a complete binary tree where the value of each nodes is less than or equal to the values of its children
 * - This makes the smallest element accessible in constant time.
 */
class MinHeap {
	private heap: number[] = [];

	constructor() {}

	/** get the index of the parent of the given index */
	private parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	/**  get the index of the left child of the given index */
	private leftChild(index: number): number {
		return 2 * index + 1;
	}

	/** get the index of the right child of the give index */
	private rightChild(index: number): number {
		return 2 * index + 2;
	}

	/** swap the elements at indices i and j */
	private swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	/** heapify up to ensure the min-heap property is maintained */
	private heapifyUp(index: number): void {
		let currentIndex = index;
		while (
			currentIndex > 0 &&
			this.heap[currentIndex] < this.heap[this.parent(currentIndex)]
		) {
			this.swap(currentIndex, this.parent(currentIndex));
			currentIndex = this.parent(currentIndex);
		}
	}

	/** heapify down to ensure the min-heap property is maintained */
	private heapifyDown(index: number): void {
		let smallest = index;
		const left = this.leftChild(index);
		const right = this.rightChild(index);

		if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
			smallest = left;
		}

		if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
			smallest = right;
		}

		if (smallest !== index) {
			this.swap(index, smallest);
			this.heapifyDown(smallest);
		}
	}

	/** Insert a new value to the heap */
	public insert(value: number): void {
		this.heap.push(value);
		this.heapifyUp(this.heap.length - 1);
	}

	/** Remove and Return the smallest value from heap */
	public extractMin(): number | undefined {
		if (this.heap.length === 0) return undefined;

		if (this.heap.length === 1) return this.heap.pop();

		const min = this.heap[0];
		this.heap[0] = this.heap.pop();
		this.heapifyDown(0);

		return min;
	}

	/** Get the smallest value from the heap without removing it */
	public peek(): number | undefined {
		return this.heap.length > 0 ? this.heap[0] : undefined;
	}

	/** Get the size of the heap */
	public size(): number {
		return this.heap.length;
	}

	/** Print the heap */
	public print(): number[] {
		return this.heap;
	}
}

const minHeap = new MinHeap();
minHeap.insert(5);
minHeap.insert(3);
minHeap.insert(8);
minHeap.insert(1);
minHeap.insert(7);

console.log('Heap:', minHeap.print()); // [1, 3, 8, 5, 7]

console.log('Extracted Min:', minHeap.extractMin()); // 1
console.log('Heap after extraction:', minHeap.print()); // [3, 5, 8, 7]

console.log('Peek:', minHeap.peek()); // 3
console.log('Heap size:', minHeap.size()); // 4
