import { Logger } from '@nestjs/common';

/**
 * SubArray Sum Equals K
 * - Input: nums = [1, 1, 1], k = 2
 * - Output: 2
 * - Explanation:
 * - There are two subarrays whose sum equals `2`: [1, 1] (from index 0 to 1) and [1, 1] (from index 1 to 2).
 */
export abstract class SubArraySumEqualsK {
	private static logger = new Logger(SubArraySumEqualsK.name);

	/** Sub Array Sum */
	public static subArraySum(nums: number[], k: number) {
		const sumMap = new Map<number, number>();

		sumMap.set(0, 1);

		let count = 0;
		let sum = 0;

		for (let i = 0; i < nums.length; i++) {
			sum += nums[i];

			if (sumMap.has(sum - k)) {
				count += sumMap.get(sum - k);
			}

			sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
		}

		return count;
	}

	/**
	 * Track Customer Transactions
	 * - Rewards and Promotions: Automatically triggering rewards when a user spends exactly a certain amount (e.g., $100 in total) across multiple purchases.
	 * - the goal is to find the number of contiguous periods where the sum equals $100.
	 */
	public static trackCustomerTransactions(
		transactions: number[],
		total: number,
	) {
		const sumMap = new Map<number, number>();

		sumMap.set(0, 1);

		let count = 0;
		let sum = 0;

		for (let i = 0; i < transactions.length; i++) {
			sum += transactions[i];

			if (sumMap.has(sum - total)) {
				count += sumMap.get(sum - total);
			}
			sumMap.set(sum, (sumMap.get(sum) || 0) + 1);
		}

		return count;
	}

	public static subArraySumUsage() {
		const nums = [1, 1, 1];
		const k = 2;
		const result = this.subArraySum(nums, k);
		this.logger.debug('------>> subArraySum result ' + result);
	}

	public static trackCustomerTransactionsUsage() {
		const transactions = [50, -20, 30, 70, -50, 100, 20];
		const total = 100;
		const result = this.trackCustomerTransactions(transactions, total);
		this.logger.debug(
			'------>> trackCustomerTransactionsUsage result ' + result,
		);
	}
}
