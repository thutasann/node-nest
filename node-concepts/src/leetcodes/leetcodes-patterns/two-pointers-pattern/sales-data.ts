/**
 * Real-life applications
 * - A real-life application of the two-pointers pattern can be found
 * - merging sorted lists or processing timelines,
 * - such as organizing event schedules or analyzing stock prices over time.
 */
export abstract class SalesData {
	/**
	 *  Merging Two Sorted Arrays of Sales Data
	 */
	public static mergingSalesData(
		salesPlatformA: number[],
		salesPlatformB: number[],
	) {
		/** pointer for salesPlatformA */
		let i = 0;
		/** pointer for salesPlatformB */
		let j = 0;

		/** marged sales */
		let mergedSales: number[] = [];

		// compare elements from both arrays and merge them
		while (i < salesPlatformA.length && j < salesPlatformB.length) {
			if (salesPlatformA[i] < salesPlatformB[j]) {
				mergedSales.push(salesPlatformA[i]);
				i++; // move pointer i forward
			} else {
				mergedSales.push(salesPlatformB[j]);
				j++; // move pointer j forward
			}
		}

		// remaining from salesPlatformA
		while (i < salesPlatformA.length) {
			mergedSales.push(salesPlatformA[i]);
			i++;
		}

		// remaining from salesPlatformB
		while (j < salesPlatformB.length) {
			mergedSales.push(salesPlatformB[j]);
			j++;
		}

		return mergedSales;
	}
}
