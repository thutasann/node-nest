import { Logger } from '@nestjs/common';

/** Prefix Sum Pattern */
export abstract class PrefixSumPattern {
	static logger = new Logger(PrefixSumPattern.name);

	/** Running Sum of 1D Array ✅ */
	public static runningSum(nums: number[]): number[] {
		let prefixSum: number[] = [];
		let currentSum: number = 0;

		for (let i = 0; i < nums.length; i++) {
			currentSum += nums[i];
			prefixSum.push(currentSum);
		}

		return prefixSum;
	}

	/** Running Sum Usage */
	public static runningSumUsage() {
		const nums = [1, 2, 3, 4];
		const result = this.runningSum(nums);
		this.logger.debug(result.toString());
	}

	/** SubArray Sum ✅ */
	public static subArraySum(nums: number[], k: number) {
		let prefixSumCount = new Map<number, number>(); // To store prefix sums and their counts
		prefixSumCount.set(0, 1); // Base case: there's one way to get a sum of 0
		let currentSum = 0;
		let count = 0;

		for (let num of nums) {
			currentSum += num; // Update the running sum (prefix sum)

			// Check if there's a prefix sum that, when subtracted, equals k
			if (prefixSumCount.has(currentSum - k)) {
				count += prefixSumCount.get(currentSum - k)!;
			}

			// Add/update the current prefix sum count in the map
			prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
		}

		return count;
	}

	/** SubArray Sum Usage */
	public static subArraySumUsage() {
		let nums = [1, 1, 1];
		let k = 2;
		this.logger.debug(this.subArraySum(nums, k)); // Output: 2
	}
}
