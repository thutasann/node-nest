import { Logger } from '@nestjs/common';
import { SlidingWindowPattern } from '.';
import { NetworkTrafficMonitoring } from './network-traffic-monitoring';

export abstract class SlidingWindowPatternUsage {
	private static logger = new Logger(SlidingWindowPatternUsage.name);

	public static maxSumSubarrayUsage() {
		const arr = [2, 1, 5, 1, 3, 2];
		const k = 3;
		const result = SlidingWindowPattern.maxSumSubarray(arr, k);
		this.logger.debug(
			'maxSumSubarrayUsage usage -> ' +
				result +
				' // Output: 9 (sum of subarray [5, 1, 3])',
		);
	}

	public static longestSubstringWithKDistinctUsage() {
		const s = 'araaci';
		const k = 2;
		const result = SlidingWindowPattern.longestSubstringWithKDistinct(s, k);
		this.logger.debug(
			'longestSubstringWithKDistinct usage -> ' +
				result +
				' // Output: 4 (substring "araa")',
		);
	}

	public static maxTrafficInWindowUsage() {
		const trafficData = [5, 1, 3, 7, 2, 6, 4, 8, 9, 3];
		const windowSize = 5;
		const result = NetworkTrafficMonitoring.maxTrafficInWindow(
			trafficData,
			windowSize,
		);
		this.logger.debug('maxTrafficInWindow usage -> ' + result);
	}
}
