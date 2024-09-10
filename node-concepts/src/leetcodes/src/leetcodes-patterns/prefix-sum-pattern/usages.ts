import { Logger } from '@nestjs/common';
import { PrefixSumPattern } from './';

export abstract class PrefixSumPatternUsage {
	static logger = new Logger(PrefixSumPattern.name);

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
}
