import { Logger } from '@nestjs/common';

/**
 * Two Pointers Pattern
 * -  used to solve problems involving arrays or lists, particularly
 * - when you're looking for pairs or subarrays that satisfy certain conditions.
 * - we initialize two variables
 * - move them towards each others or away from each other
 * - O(n ^ 2) -> O(n)
 */
export abstract class TwoPointersPattern {
	/**
	 * Check string is palidrome
	 * - place one pointer at the beginning of the string and another at the end.
	 * - move the pointers each other, comparing the characters at each position.
	 * - compare the characters at both pointers
	 * - if they are not the same, the string is not palidrome
	 * - if they are the same, move both pointers inward and repeat.
	 */
	public static isPalidrome(s: string): boolean {
		let left = 0;
		let right = s.length - 1;

		while (left < right) {
			// move left pointer to the next alphanumeric char
			while (left < right && !this.isAlphaNumeric(s[left])) {
				left++;
			}

			// move right pointer to the previous alphanumeric char
			while (left < right && !this.isAlphaNumeric(s[right])) {
				right--;
			}

			if (s[left].toLowerCase() !== s[right].toLowerCase()) {
				return false;
			}

			left++;
			right--;
		}

		return true;
	}

	/**
	 * Removing Duplicates from a Sorted Array
	 * - Pointer 1 (slow): Keeps track of the last unique element.
	 * - Pointer 2 (fast): Moves through the array to find the next unique element.
	 */
	public static removeDuplicates(numbers: number[]): number {
		if (numbers.length === 0) return 0;

		let slow = 0;

		// Second pointer (fast)
		for (let fast = 1; fast < numbers.length; fast++) {
			if (numbers[slow] !== numbers[fast]) {
				// When a new unique element is found,
				// move it to the next position in the array
				slow++;
				numbers[slow] = numbers[fast];
			}
		}

		return slow + 1; // The length of the array with unique elements
	}

	/** Helper : to check character isAlphaNumeric or not */
	private static isAlphaNumeric(char: string): boolean {
		return /^[a-zA-Z0-9]$/.test(char);
	}
}
