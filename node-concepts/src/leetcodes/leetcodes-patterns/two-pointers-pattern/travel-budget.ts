/**
 * Travel Budget (3sum)
 * - a list of potential travel expenses (e.g., accommodation, flights, activities) from different providers.
 * - You have a fixed budget and want to find all combinations of three expenses that add up to exactly this budget
 * - This could help you determine feasible sets of expenses within your budget.
 */
export abstract class TravelBudget {
	/** find triplets */
	public static findTriplets(expenses: number[], budget: number): number[][] {
		const result: number[][] = [];

		expenses.sort((a, b) => a - b);

		for (let i = 0; i < expenses.length - 2; i++) {
			if (i > 0 && expenses[i] === expenses[i - 1]) {
				continue;
			}

			let left = i + 1;
			let right = expenses.length - 1;

			while (left < right) {
				const sum = expenses[i] + expenses[left] + expenses[right];

				if (sum === budget) {
					result.push([expenses[i], expenses[left], expenses[right]]);

					while (left < right && expenses[left] === expenses[left + 1]) {
						left++;
					}

					while (left < right && expenses[right] === expenses[right - 1]) {
						right--;
					}

					left++;
					right--;
				} else if (sum < budget) {
					left++;
				} else {
					right--;
				}
			}
		}

		return result;
	}
}
