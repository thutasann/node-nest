import { Logger } from '@nestjs/common';

/**
 * Two Sum II - Input Array Is Sorted
 * - This Problem applies `TwoPointers Pattern`
 * - Input: numbers = [2, 7, 11, 15], target = 9
 * - Output: [1, 2]
 * - Explanation: The numbers at index 1 and 2 add up to 9.
 */
export abstract class TwoSumInputArrayIsSorted {
	private static logger = new Logger(TwoSumInputArrayIsSorted.name);

	/** solution one */
	public static solutionOne(numbers: number[], target: number): number[] {
		if (!numbers) return [];

		let left = 0;
		let right = numbers.length - 1;

		while (left < right) {
			const sum = numbers[left] + numbers[right];

			if (sum === target) {
				return [left + 1, right + 1];
			} else if (sum < target) {
				left++;
			} else {
				right--;
			}
		}

		return [];
	}

	public static solutionOneUsage() {
		const numbers = [2, 7, 11, 15];
		const target = 9;
		const result = this.solutionOne(numbers, target);
		this.logger.debug('------>> TwoSumInputArrayIsSorted result ' + result);
	}
}
