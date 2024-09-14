/**
 * Benefits of Two-Pointers in Large Data:
 * - The two-pointers technique generally operates in O(n) time complexity, making it ideal for large datasets where brute-force algorithms would be too slow.
 * - This technique doesn’t require additional data structures, which helps minimize memory usage, crucial when working with big data.
 * -  By moving two pointers independently, this approach allows you to explore two parts of a dataset in parallel, which is highly efficient for certain tasks like finding pairs or subsequences.
 */
export abstract class TwoPointerLargeDataExamples {
	/**
	 * Stock Market Analysis
	 * - In a stock market, you are given a large list of daily stock prices,
	 * - find the best days to buy and sell stocks in order to maximize profit
	 * - keeping one pointer fixed on the "buy" price
	 * - moving the other pointer to find the optimal "sell" price.
	 */
	public static stockMarketAnalysis(prices: number[]): number {
		let minPrice = Infinity;
		let maxProfit = 0;

		for (let i = 0; i < prices.length; i++) {
			if (prices[i] < minPrice) {
				minPrice = prices[i]; // Move the left pointer
			} else {
				maxProfit = Math.max(maxProfit, prices[i] - minPrice); // Move the right pointer
			}
		}

		return maxProfit;
	}

	/**
	 * Matching Products with Customer Preferences
	 * - To find the best matching products for customers based on their budget and preferences.
	 * - Given two large sorted arrays of customer budgets and product prices,
	 * - We have millions of customers with varying budgets and a list of products with different prices
	 * - The goal is to recommend the best product within each customer's budget.
	 */
	public static matchCustomersWithProducts(
		budgets: number[],
		prices: number[],
	): number[][] {
		/** matches */
		const matches: number[][] = [];
		/** pointer for budgets */
		let i = 0;
		/** pointer for prices */
		let j = 0;

		while (i < budgets.length && j < prices.length) {
			if (prices[j] <= prices[i]) {
				matches.push([budgets[i], prices[j]]);
				j++; // move to the next price
			} else {
				i++; // move to the next budget
			}
		}

		return matches;
	}

	/**
	 * Data Compression
	 * - a large sequence of data (e.g., a log of activities or telemetry data)
	 * - that you want to compress by finding repetitive sequences
	 * - use two pointers to find repeated segments and compress them efficiently.
	 * - imagine working with a gigabyte-sized log file of system activities.
	 * - the two pointers can help identify sequences that repeat frequently and can be compressed using run-length encoding.
	 */
	public static compressLog(log: string): string {
		let compressed = '';
		let i = 0;

		while (i < log.length) {
			let count = 1;
			let j = i + 1;

			while (j < log.length && log[j] === log[i]) {
				count++;
				j++;
			}

			compressed += log[i] + (count > 1 ? count : '');
			i = j; // move both ponter
		}

		return compressed;
	}

	/**
	 * Genome Sequencing (Finding Substrings)
	 * - In bioinformatics, you often work with large datasets of DNA sequences,
	 * - and finding specific patterns or substrings is a common task.
	 * - Example:  Given a large genome sequence and a set of target sequences,
	 * - can use two pointers to search for matching subsequences.
	 */
	public static genomeSequence(genome: string, target: string): boolean {
		let i = 0, // genome pointer
			j = 0; // target pointer

		while (i < genome.length && j < target.length) {
			if (genome[i] === target[j]) {
				j++; // move target pointer if a character matches
			}
			i++; // always move genome pointer
		}

		return j === target.length;
	}
}
