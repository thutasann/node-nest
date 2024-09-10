/**
 * 303. Range Sum Query - Immutable
 * - Pattern -> prefixSum pattern
 */
class RangeSumQuery {
	private prefixSum: number[] = [];

	constructor(nums: number[]) {
		this.prefixSum = new Array(nums.length + 1).fill(0);
		console.log('this.prefixSum', this.prefixSum);

		for (let i = 0; i < nums.length; i++) {
			this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
		}
	}

	/** Handle sumRange Query */
	sumRange(i: number, j: number): number {
		return this.prefixSum[j + 1] - this.prefixSum[i];
	}
}

const nums = [-2, 0, 3, -5, 2, -1];
const rangeSumQuery = new RangeSumQuery(nums);

console.log(rangeSumQuery.sumRange(0, 2)); // Output: 1
console.log(rangeSumQuery.sumRange(2, 5)); // Output: -1
console.log(rangeSumQuery.sumRange(0, 5)); // Output: -3
