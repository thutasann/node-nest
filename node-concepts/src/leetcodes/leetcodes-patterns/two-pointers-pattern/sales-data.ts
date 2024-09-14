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
		slaesPlatformA: number[],
		slaesPlatformB: number[],
	) {
		/** pointer for salesPlatformA */
		let i = 0;
		/** pointer for salesPlatformB */
		let j = 0;

		let mergedSales: number[] = [];

		// compare elements from both arrays and merge them
		while (i < slaesPlatformB.length && j < slaesPlatformB.length) {
			if (slaesPlatformA[i] < slaesPlatformB[j]) {
				mergedSales.push(slaesPlatformA[i]);
				i++; // move pointer i forward
			} else {
				mergedSales.push(slaesPlatformB[j]);
				j++; // move pointer j forward
			}
		}

		// remaining from salesPlatformA
		while (i < slaesPlatformA.length) {
			mergedSales.push(slaesPlatformA[i]);
			i++;
		}

		// remaining from salesPlatformB
		while (j < slaesPlatformB.length) {
			mergedSales.push(slaesPlatformB[i]);
			j++;
		}

		return mergedSales;
	}
}
