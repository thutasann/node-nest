/**
 * Partation Function
 * @description
 * - a key component of the QuickSort algorithm
 * - it rearranges the elements in the array so that
 * - all elements less than or equal to the pivot are on the left of the pivot
 * - all elements greater than the pivot are on the right
 * @param arr - The Array to be partitioned
 * @param low - The starting index of the range to be partitioned
 * @param high - The ending index of the range to be partitioned
 * @private
 */
function partation(arr: number[], low: number, high: number): number {
	/** element at the high index of the array */
	const pivot = arr[high];

	/** index to keep track of the bountary between elements less than or equal to the pivot and elements greater than the pivot */
	let index = low - 1;

	for (let i = low; i < high; i++) {
		if (arr[i] <= pivot) {
			index++;
			// swap the current element `arr[i]` with the element at index
			// that elements <= to the pivot are moved to the left side of the array.
			[arr[i], arr[index]] = [arr[index], arr[i]];
		}
	}

	// increment index to get the correct position for the pivot
	index++;

	// Move the pivot element from high index to its correct position in the array.
	arr[high] = arr[index];

	// The element that was swapped with the pivot is moved to the position previously occupied by the pivot.
	arr[index] = pivot;

	return index;
}

/**
 * Quick Sort Util
 * - It recursively sorts the array by partitioning it around a pivot.
 * @param arr - The Array to be Sorted
 * @param low - The starting index of the subarray to be sorted.
 * @param high - The ending index of the subarray to be sorted.
 * @private
 */
function quickSortUtil(arr: number[], low: number, high: number): void {
	if (low >= high) return;

	const pivot = partation(arr, low, high);

	quickSortUtil(arr, low, pivot - 1);
	quickSortUtil(arr, pivot + 1, high);
}

/**
 * Quick Sort
 */
function quickSort(arr: number[]): void {
	quickSortUtil(arr, 0, arr.length - 1);
	console.log('Quick Sorted Array: ', arr);
}

quickSort([4, 5, 6, 1, 2]);
