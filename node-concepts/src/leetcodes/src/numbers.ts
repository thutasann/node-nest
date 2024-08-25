import { Logger } from '@nestjs/common';

/** Numbers Related LeetCodes */
export abstract class Numbers {
	static logger = new Logger(Numbers.name);

	public static swapNumber(firstNum: number, secondNum: number) {
		this.debug('Swap Number');
		let temp: number = 0;
		temp = firstNum;
		firstNum = secondNum;
		secondNum = temp;
		console.log(
			`After Swaping, firstNum is ${firstNum} and secondNum is ${secondNum}`,
		);
	}

	public static swapNumberWithIndex(
		arr: string[],
		index1: number,
		index2: number,
	) {
		this.debug('Swap Numbers with Index ');
		if (
			index1 < 0 ||
			index1 >= arr.length ||
			index2 < 0 ||
			index2 >= arr.length
		) {
			throw new Error('Invalid indices provides.');
		}

		const temp = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = temp;

		console.log(`After Swaping, ${arr}`);
	}

	public static getSecondLargest(numbers: number[]) {
		this.debug('Get Second Largest');
		if (numbers.length < 2) {
			console.log('undefined');
		}

		let largest = -Infinity;
		let secondLargest = -Infinity;

		for (const number of numbers) {
			if (number > largest) {
				secondLargest = largest;
				largest = number;
			} else if (number > secondLargest && number !== largest) {
				secondLargest = number;
			}
		}

		console.log(
			'secondLargest -> ',
			secondLargest !== -Infinity ? secondLargest : undefined,
		);
	}

	public static reverseNumber(num: number) {
		this.debug('Reverse Number');
		let reversed = 0;
		while (num !== 0) {
			const digit = num % 10;
			reversed = reversed * 10 + digit;
			num = Math.floor(num / 10);
		}
		console.log('reversed', reversed);
	}

	public static sumOfNumber() {
		this.debug('sum of number');
		let num = 234;
		let temp: number;
		let sumOfNum = 0;

		while (num !== 0) {
			temp = num % 10;
			num /= 10;
			sumOfNum += Math.floor(temp);
		}

		console.log('sumOfNum', sumOfNum);
	}

	private static debug(method: string) {
		this.logger.debug(`------>> ${method} (LeetCodes) `);
	}
}
