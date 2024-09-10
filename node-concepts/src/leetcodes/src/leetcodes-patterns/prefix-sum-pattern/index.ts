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

	/** Calculate Revenues ✅ */
	public static calPrefixRevenueSum(revenues: number[]): number[] {
		let prefixSum: number[] = [];
		let currentSum = 0;

		for (let i = 0; i < revenues.length; i++) {
			currentSum += revenues[i];
			prefixSum[i] = currentSum;
		}

		return prefixSum;
	}

	/** Get Revenue From Period ✅ */
	public static getRevenueFromPeriod(
		prefixSum: number[],
		startDay: number,
		endDay: number,
	): number {
		const startIndex = startDay - 1;
		const endIndex = endDay - 1;

		if (startIndex === 0) {
			return prefixSum[startIndex];
		} else {
			return prefixSum[endIndex] - prefixSum[startIndex - 1];
		}
	}
}
