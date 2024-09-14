import { Logger } from '@nestjs/common';

/**
 * 525. Contiguous Array
 */
export abstract class ContiguousArray {
	static logger = new Logger(ContiguousArray.name);

	/**
	 * Find Max Length
	 */
	public static findMaxLength(nums: number[]): number {
		const map = new Map<number, number>();
		map.set(0, -1);

		let maxLength = 0;
		let count = 0;

		for (let i = 0; i < nums.length; i++) {
			count += nums[i] === 1 ? 1 : -1;

			if (map.has(count)) {
				maxLength = Math.max(maxLength, i - map.get(count));
			} else {
				map.set(count, i);
			}
		}

		return maxLength;
	}

	/**
	 *  Find Max Balance Mood
	 * - 1 is good mood
	 * - 0 is bad mood
	 */
	public static findMaxBalanceMood(moods: number[]): number {
		/** hash map to store the first occurance of each count value */
		const map = new Map<number, number>();

		/** initialize the count at 0 with an index of -1 to handle the full array case */
		map.set(0, -1);

		let maxLength = 0;
		let count = 0;

		for (let i = 0; i < moods.length; i++) {
			// increment or decrement count based on whether the element is good mood or bad mood
			count += moods[i] === 1 ? 1 : -1;

			if (map.has(count)) {
				// If the count has been seen before, calculate the length of the balanced period
				maxLength = Math.max(maxLength, i - map.get(count));
			} else {
				map.set(count, i);
			}
		}

		return maxLength;
	}

	/**
	 * E-commerce User Engagement Tracking
	 * - 1 ->  the user performing an action
	 * - 2 ->  the user simply browsing
	 * - We want to determine the longest period of time during which the user’s browsing and action-taking behavior was balanced.
	 */
	public static ecommerceEngagementTracking(activities: number[]) {
		const map = new Map<number, number>();

		map.set(0, -1);

		let maxLength = 0;
		let count = 0;

		for (let i = 0; i < activities.length; i++) {
			count += activities[i] === 1 ? 1 : -1;

			if (map.has(count)) {
				maxLength = Math.max(maxLength, i - map.get(count));
			} else {
				map.set(count, i);
			}
		}

		return maxLength;
	}

	public static findMaxLengthUsage() {
		const result = this.findMaxLength([0, 1, 0, 1, 1, 0, 0]);
		this.logger.debug('------>> findMaxLength result ' + result);
	}

	public static findMaxBalanceMoodUsage() {
		const moods = [1, 0, 1, 1, 0, 0, 1];
		const moodResult = this.findMaxBalanceMood(moods);
		this.logger.debug('------>> findMaxBalanceMood result ' + moodResult);
	}

	public static ecommerceEngagementUsage() {
		const activities = [1, 0, 0, 1, 1, 0, 1];
		const moodResult = this.ecommerceEngagementTracking(activities);
		this.logger.debug('------>> ecommerceEngagementUsage result ' + moodResult);
	}
}
