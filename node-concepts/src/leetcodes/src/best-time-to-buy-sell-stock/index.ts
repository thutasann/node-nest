import { Logger } from '@nestjs/common';

/**
 * Best Time to Buy and Sell Stock with Cooldown
 * @description
 * - Given an array `prices` where `prices[i]` is the price of an given stock on the `ith` day.
 * - Find the maximum profits you can achieve.
 * - You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions
 * - After you sell stock, you cannot buy stock on next day (i.e., cooldown one day)
 * - NOTE: you may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again)
 * @example
 * - Input: prices = [1,2,3,0,2]
 * - Output: 3
 * - Explanation: transactions = [buy, sell, cooldown, buy, sell]
 * @example
 * - Input: prices = [1]
 * - Output: 0
 */
export abstract class BestTimeToBuyAndSellStockWithCoolDown {
	static logger = new Logger(BestTimeToBuyAndSellStockWithCoolDown.name);

	/**
	 * Solution One
	 * @returns Maximum profit achievable with the given constraints.
	 */
	public static solutionOne(prices: number[]): number {
		const cache = new Map<number, number>();

		const getMaxProfit = (i: number, isBuying: boolean): number => {
			if (i >= prices.length) return 0;

			const cacheKey = 10 * i + (isBuying ? 1 : 0);

			if (cache.has(cacheKey)) return cache.get(cacheKey)!;

			const cooldown = getMaxProfit(i + 1, isBuying);

			if (isBuying) {
				const buyProfit = getMaxProfit(i + 1, false) - prices[i];
				cache.set(cacheKey, Math.max(buyProfit, cooldown));
			} else {
				const sellProfit = getMaxProfit(i + 2, true) + prices[i];
				cache.set(cacheKey, Math.max(sellProfit, cooldown));
			}

			return cache.get(cacheKey);
		};

		return getMaxProfit(0, true);
	}

	/**
	 * Solution Two
	 * @returns Maximum profit achievable with the given constraints.
	 */
	public static solutionTwo(prices: number[]): number {
		if (prices.length === 0) return 0;

		const n = prices.length;

		// Initialize dp arrays to store the profit at each state
		const hold = new Array(n).fill(0); // Holding a stock
		const sold = new Array(n).fill(0); // Just sold a stock
		const cooldown = new Array(n).fill(0); // In a cooldown state

		// On the first day, if we buy stock, the profit is -prices[0]
		hold[0] = -prices[0];

		for (let i = 1; i < n; i++) {
			// Hold: max of holding the previous day or buying today
			hold[i] = Math.max(hold[i - 1], cooldown[i - 1] - prices[i]);

			// Sold: max of selling today (i.e., you were holding before)
			sold[i] = hold[i - 1] + prices[i];

			// Cooldown: max of being in cooldown from the previous day or after selling today
			cooldown[i] = Math.max(cooldown[i - 1], sold[i - 1]);
		}

		// The maximum profit can either be in the sold or cooldown state on the last day
		return Math.max(sold[n - 1], cooldown[n - 1]);
	}

	public static usageOne() {
		const prices1 = [1, 2, 3, 0, 2];
		this.logger.debug(this.solutionOne(prices1));
	}

	public static usageTwo() {
		const prices1 = [1, 2, 3, 0, 2];
		this.logger.debug(this.solutionTwo(prices1));
	}
}
