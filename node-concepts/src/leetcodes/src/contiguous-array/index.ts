/**
 * 525. Contiguous Array
 */
class ContiguousArray {
	public findMaxLength(nums: number[]) {
		const map = new Map<number, number>();
		map.set(0, -1);

		let maxLength = 0;
		let count = 0;

		for (let i = 0; i < nums.length; i++) {
			count += nums[i] === 1 ? 1 : -1;

			if (map.has(count)) {
				maxLength = Math.max(maxLength, i - map.get(count));
			} else {
				map.set(count, i);
			}
		}

		return maxLength;
	}
}

const contiguousArray = new ContiguousArray();
const result = contiguousArray.findMaxLength([0, 1, 0, 1, 1, 0, 0]);
console.log('result', result);
