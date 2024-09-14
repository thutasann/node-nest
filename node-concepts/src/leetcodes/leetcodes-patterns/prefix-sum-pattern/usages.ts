import { Logger } from '@nestjs/common';
import { PrefixSumPattern } from '.';
import { EcommercePrefixSum, Purchase } from './ecommerce-prefix-sum';
import { GamePrefixSumSample } from './game-prefix-sum';

export abstract class PrefixSumPatternUsage {
	private static logger = new Logger(PrefixSumPatternUsage.name);

	/** Running Sum Usage */
	public static runningSumUsage() {
		const nums = [1, 2, 3, 4];
		const result = PrefixSumPattern.runningSum(nums);
		this.logger.debug(`runningSumUsage : ${result.toString()}`);
	}

	/** SubArray Sum Usage */
	public static subArraySumUsage() {
		let nums = [1, 1, 1];
		let k = 2;
		this.logger.debug(
			`subArraySumUsage : ${PrefixSumPattern.subArraySum(nums, k)}`,
		); // Output: 2
	}

	/** Calculate Revenue Usage */
	public static calRevenueUsage() {
		const revenues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
		const prefixRevenueSum = PrefixSumPattern.calPrefixRevenueSum(revenues);
		this.logger.debug(`prefixRevenueSum : ${prefixRevenueSum}`);

		const reveneFromPeriod = PrefixSumPattern.getRevenueFromPeriod(
			prefixRevenueSum,
			3,
			7,
		);
		this.logger.debug(`reveneFromPeriod : ${reveneFromPeriod}`);
	}

	/** Ecommerce Usage */
	public static ecommerceUsage() {
		const purchases: Purchase[] = [
			{ day: 1, amount: 500 },
			{ day: 2, amount: 700 },
			{ day: 3, amount: 800 },
			{ day: 4, amount: 1000 },
			{ day: 5, amount: 1200 },
		];

		const prefixSum = EcommercePrefixSum.prefixSum(purchases);
		this.logger.debug(`ecommerce prefixSum : ${prefixSum}`);

		const totalSpending = EcommercePrefixSum.getTotalSpendingForPeriod(
			prefixSum,
			2,
			5,
		);
		this.logger.debug(`ecommerce totalSpending : ${totalSpending}`);

		const discount = EcommercePrefixSum.getDiscount(totalSpending);
		this.logger.debug(`ecommerce discount : ${discount}`);
	}

	/** Game Usage */
	public static gameUsage() {
		const healthChanges = [-10, 20, -5, 30, -15, 25, -10, -20, 15, -5];

		const prefixSum = GamePrefixSumSample.calculatePrefixSum(healthChanges);

		// Query health change from Level 3 to Level 7
		const healthChange = GamePrefixSumSample.getHealthChangeForLevels(
			prefixSum,
			3,
			7,
		);
		this.logger.debug(
			`Total health change from Level 3 to Level 7: ${healthChange}`,
		);

		// Query health change from Level 1 to Level 5
		const healthChange2 = GamePrefixSumSample.getHealthChangeForLevels(
			prefixSum,
			1,
			5,
		);

		this.logger.debug(
			`Total health change from Level 1 to Level 5: ${healthChange2}`,
		);
	}
}
