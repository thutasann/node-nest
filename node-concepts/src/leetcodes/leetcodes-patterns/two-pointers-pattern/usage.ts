import { Logger } from '@nestjs/common';
import { TwoPointersPattern } from '.';
import { SalesData } from './sales-data';

export abstract class TwoPointersPatternUsage {
	private static logger = new Logger(TwoPointersPatternUsage.name);

	/** strings isPalidrome usage */
	public static isPalidromeUsage() {
		const resultOne = TwoPointersPattern.isPalidrome(
			'A man, a plan, a canal: Panama',
		);
		const resultTwo = TwoPointersPattern.isPalidrome('race a car');

		this.logger.debug('isPalidrome result one -> ' + resultOne);
		this.logger.debug('isPalidrome result two -> ' + resultTwo);
	}

	/** remove duplicates from array usage */
	public static removeDuplicatesUasge() {
		const nums = [1, 1, 2];
		const result = TwoPointersPattern.removeDuplicates(nums);
		this.logger.debug('removeDuplicates result  -> ' + result);
	}

	/** merge sales data usage */
	public static mergeSalesDataUsage() {
		const salesPlatformA = [1, 4, 6, 9]; // Sales timestamps in hours
		const salesPlatformB = [2, 5, 7, 10]; // Sales timestamps in hours

		const mergedSales = SalesData.mergingSalesData(
			salesPlatformA,
			salesPlatformB,
		);

		this.logger.debug('mergedSales result  -> ' + mergedSales);
	}
}
