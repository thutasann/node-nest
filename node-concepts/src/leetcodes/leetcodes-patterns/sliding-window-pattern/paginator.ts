/**
 * ## A Pagination System that using the sliding window pattern
 * - involves managing a "window" of items that can be shifted forward and backward as the user navigates between pages.
 * - This is useful for applications where only a portion of the total data (a "window") needs to be displayed at a time.
 * ### Approach
 * - Window Size: This is the number of items displayed per page.
 * - Sliding Window: The window slides forward or backward as the user navigates between pages.
 * - Data Array: The total array of data remains the same, but the view of the data changes according to the window size.
 */
export class Paginator<T> {
	private data: T[];
	private windowSize: number;
	private currentPage: number;

	/**
	 * @param data - data array
	 * @param windowSize - window size
	 */
	constructor(data: T[], windowSize: number) {
		this.data = data;
		this.windowSize = windowSize;
		this.currentPage = 0;
	}

	/** get current page items */
	getCurrentPageItems(): T[] {
		const start = this.currentPage * this.windowSize;
		const end = start + this.windowSize;
		return this.data.slice(start, end);
	}

	/** move to next page */
	next(): void {
		if (this.currentPage < Math.ceil(this.data.length / this.windowSize) - 1) {
			this.currentPage++;
		}
	}

	/** move to the previous page */
	prev(): void {
		if (this.currentPage > 0) {
			this.currentPage--;
		}
	}

	/** get total number of pages */
	getTotalPages(): number {
		return Math.ceil(this.data.length / this.windowSize);
	}

	/** get current page number (1-indexed for displayed) */
	getCurrentPageNumber(): number {
		return this.currentPage + 1;
	}

	/*** get item by specific index in data array */
	getItemByIndex(index: number): T | null {
		if (index >= 0 && index < this.data.length) {
			return this.data[index];
		}
		return null;
	}
}

// Example Usage
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Data to paginate
const paginator = new Paginator(items, 3); // Show 3 items per page

console.log('Page 1:', paginator.getCurrentPageItems()); // Output: [1, 2, 3]

paginator.next();
console.log('Page 2:', paginator.getCurrentPageItems()); // Output: [4, 5, 6]

paginator.next();
console.log('Page 3:', paginator.getCurrentPageItems()); // Output: [7, 8, 9]

paginator.next();
console.log('Page 4:', paginator.getCurrentPageItems()); // Output: [10, 11]

paginator.prev();
console.log('Page 3:', paginator.getCurrentPageItems()); // Output: [7, 8, 9]

console.log('Item by index: ', paginator.getItemByIndex(2));
console.log('Current Page:', paginator.getCurrentPageNumber());
