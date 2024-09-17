import { Logger, RequestTimeoutException } from '@nestjs/common';

/**
 * Container With Most Water
 * - You are given an array height where height[i] represents the height of the vertical line at index i.
 * - You need to find the two lines that together with the x-axis form a container that holds the most water.
 * - The objective is to maximize the area of water the container can hold.
 * @description
 * - Initialize two pointers, left and right, pointing to the start and end of the array respectively.
 * - Calculate the area formed between the two lines pointed by the pointers.
 * - Move the pointer that points to the shorter line inward (either left++ or right--) since moving the taller line won’t increase the area.
 * - Repeat this process until the two pointers meet, keeping track of the maximum area.
 */
export abstract class ContainerWithMostWater {
	private static logger = new Logger(ContainerWithMostWater.name);

	public static maxArea(height: number[]) {
		let left = 0;
		let right = height.length - 1;
		let maxArea = 0;

		while (left < right) {
			const currentArea =
				Math.min(height[left], height[right]) * (right - left);
			maxArea = Math.max(maxArea, currentArea);

			if (height[left] < height[right]) {
				left++;
			} else {
				right--;
			}
		}

		return maxArea;
	}

	public static maxAreaUsage() {
		const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
		const result = this.maxArea(heights);
		this.logger.debug('------>> maxAreaUsage result ' + result);
	}
}
