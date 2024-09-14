import { Logger } from '@nestjs/common';
import { TwoPointersPattern } from '.';
import { SalesData } from './sales-data';
import { TravelBudget } from './travel-budget';
import { TwoPointerLargeDataExamples } from './large-data';

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
		const nums = [1, 1, 2, 3, 3, 4, 5, 5];
		const length = TwoPointersPattern.removeDuplicates(nums);
		this.logger.debug('removeDuplicates length  -> ' + length);
		this.logger.debug('removeDuplicates length  -> ' + nums.slice(0, length));
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

	/** travel budget usage */
	public static travelBudgetUsage() {
		const expenses = [200, 400, 600, 800, 1000, 1200];
		const budget = 2000;

		const triplets = TravelBudget.findTriplets(expenses, budget);
		this.logger.debug('travelBudget result  -> ');
		console.log(triplets);
	}

	/** stock market analysis usage */
	public static stockMarketAnalysisUsage() {
		const prices = [7, 1, 5, 3, 6, 4];
		const maxProfit = TwoPointerLargeDataExamples.stockMarketAnalysis(prices);
		this.logger.debug('stock market maxProfit -> ' + maxProfit); // Output: 5 (Buy at 1, sell at 6)
	}

	/** matching products with customer preferences */
	public static matchCustomersWithProductsUsage() {
		const budgets = [50, 150, 200, 300];
		const prices = [40, 100, 200, 250];
		const result = TwoPointerLargeDataExamples.matchCustomersWithProducts(
			budgets,
			prices,
		);
		this.logger.debug('match customers result -> ');
		console.log(result);
	}

	/** compress log usage */
	public static compressLogUsage() {
		const log = 'aaabbbccddddd';
		const result = TwoPointerLargeDataExamples.compressLog(log);
		this.logger.debug('compress log usage -> ' + result);
	}

	/** genome sequence usage */
	public static genomeSequenceUsage() {
		const genome = 'ACGTACGTGACG';
		const target = 'GTA';
		const result = TwoPointerLargeDataExamples.genomeSequence(genome, target);
		this.logger.debug('genome sequence usage -> ' + result);
	}
}
