/**
 * Sliding Window Pattern
 * - efficient way to solve problems involving sequences (arrays or strings) by maintaining a subset of elements (a "window")
 * - and sliding it over the entire sequence
 * - The size of the window can be fixed or variable, depending on the problem.
 * - Window: A subarray or substring you are processing.
 * - Sliding: Moving the window one element at a time, usually from left to right in the sequence.
 * - Efficiency: This approach avoids recalculating the same things repeatedly, making it efficient for problems involving contiguous subarrays/substrings.
 */
export abstract class SlidingWindowPattern {
	/** Maximum Sum of Subarray of Size k */
	public static maxSumSubarray(arr: number[], k: number): number {
		let maxSum = 0,
			windowSum = 0;

		for (let i = 0; i < k; i++) {
			maxSum += arr[i];
		}

		windowSum = maxSum;

		// Slide the window across the array
		for (let i = k; i < arr.length; i++) {
			// Subtract the element that is left out and add the new element to the window
			windowSum += arr[i] - arr[i - k];
			maxSum = Math.max(maxSum, windowSum);
		}

		return maxSum;
	}

	/** Finding the Longest Substring with K Distinct Characters */
	public static longestSubstringWithKDistinct(s: string, k: number) {
		let windowStart = 0;
		let maxLength = 0;
		let charFrequency: { [key: string]: number } = {};

		for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
			const endChar = s[windowEnd];
			if (!(endChar in charFrequency)) {
				charFrequency[endChar] = 0;
			}
			charFrequency[endChar]++;

			// shrink the sliding window until we have no more than k distinct characters
			while (Object.keys(charFrequency).length > k) {
				const startChar = s[windowStart];
				charFrequency[startChar]--;
				if (charFrequency[startChar] === 0) {
					delete charFrequency[startChar];
				}
				windowStart++;
			}

			maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
		}

		return maxLength;
	}
}
