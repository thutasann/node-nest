/**
 * Game Prefix Sum Sample
 * - Scenario: Player Health Over Time
 */
export abstract class GamePrefixSumSample {
	/** Calculate Prefix Sum */
	public static calculatePrefixSum(healthChanges: number[]): number[] {
		let prefixSum: number[] = [];
		let currentSum = 0;

		for (let i = 0; i < healthChanges.length; i++) {
			currentSum += healthChanges[i];
			prefixSum[i] = currentSum;
		}

		return prefixSum;
	}

	/** Get Health Change for Levels */
	public static getHealthChangeForLevels(
		prefixSum: number[],
		startLevel: number,
		endLevel: number,
	) {
		const startIndex = startLevel - 1;
		const endIndex = endLevel - 1;

		if (startIndex === 0) {
			return prefixSum[startIndex];
		} else {
			return prefixSum[endIndex] - prefixSum[startIndex - 1];
		}
	}
}
