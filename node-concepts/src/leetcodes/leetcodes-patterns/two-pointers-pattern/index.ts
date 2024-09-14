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

	/** Helper : to check character isAlphaNumeric or not */
	private static isAlphaNumeric(char: string): boolean {
		return /^[a-zA-Z0-9]$/.test(char);
	}
}
