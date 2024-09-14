import { Logger } from '@nestjs/common';

type Triplet<T> = [T, T, T];

/**
 * Three Sum
 * - This problem applies `Two Pointers Pattern`
 * - finding all unique triplets in an integer array
 * - such that their sum equals zero
 */
export abstract class ThreeSum {
	private static logger = new Logger(ThreeSum.name);

	/**
	 * Approach
	 * - sort the array to make it easier to avoid duplicates
	 * - apply the two pointer technique
	 * - for each element `nums[i]`, treat it as the first element of the triplet
	 * - use the two pointers (left and right) to find pairs in the subarray
	 */
	public static solutionOne(nums: number[]): number[][] {
		const result: number[][] = [];

		nums.sort((a, b) => a - b);

		for (let i = 0; i < nums.length - 2; i++) {
			if (i > 0 && nums[i] === nums[i - 1]) {
				continue;
			}

			/** pointer at the element after the current i */
			let left = i + 1;

			/** pointer at the end of the array */
			let right = nums.length - 1;

			while (left < right) {
				const sum = nums[i] + nums[left] + nums[right];

				if (sum === 0) {
					result.push([nums[i], nums[left], nums[right]]);

					left++;
					right--;

					// Skip duplicate elements to avoid repeated triplets
					while (left < right && nums[left] === nums[left - 1]) {
						left++;
					}

					while (left < right && nums[right] === nums[right - 1]) {
						right--;
					}
				} else if (sum < 0) {
					left++;
				} else {
					right--;
				}
			}
		}

		return result;
	}

	public static solutionOneUsage() {
		const nums = [-1, 0, 1, 2, -1, -4];
		const result = this.solutionOne(nums);
		this.logger.debug(`------>> solution one ${result}`);
	}

	public static tripletArraySample() {
		const tripletArray: Triplet<number>[] = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		this.logger.debug('------>> triplet array ' + tripletArray);
	}
}
