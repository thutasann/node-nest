/** Purchase Type */
export type Purchase = {
	day: number;
	amount: number;
};

/** Ecommerce PrefixSum */
export abstract class EcommercePrefixSum {
	/** Prefix Sum */
	public static prefixSum(purchases: Purchase[]): number[] {
		let prefixSum: number[] = [];
		let currentSum = 0;

		for (let i = 0; i < purchases.length; i++) {
			currentSum += purchases[i].amount;
			prefixSum[i] = currentSum;
		}

		return prefixSum;
	}

	/** Get Total Spending For Period */
	public static getTotalSpendingForPeriod(
		prefixSum: number[],
		startDay: number,
		endDay: number,
	): number {
		// Convert days to zero-indexed
		const startIndex = startDay - 1;
		const endIndex = endDay - 1;

		if (startIndex === 0) {
			return prefixSum[startIndex];
		} else {
			return prefixSum[endIndex] - prefixSum[startIndex - 1];
		}
	}

	/** Get Discord */
	public static getDiscount(totalSpending: number) {
		if (totalSpending > 3000) {
			return 0.15; // 15% discount
		} else if (totalSpending > 2000) {
			return 0.1; // 10% discount
		} else if (totalSpending > 1000) {
			return 0.05; // 5% discount
		}
		return 0; // No discount
	}
}
