export abstract class NumberOfIslands {
	/** solution one */
	public static solutionOne(grid: number[][]): number {
		const visited = grid.map((row) => row.map((cell) => false));

		let islandCount = 0;

		for (let i = 0; i < grid.length; i++) {
			for (let j = 0; j < grid[i].length; j++) {
				if (this.dFS(i, j, grid, visited)) islandCount++;
			}
		}

		return islandCount;
	}

	/** depth first search
	 * @private
	 * @example
	 * - if returns true, means, we have an island
	 */
	private static dFS(
		i: number,
		j: number,
		grid: number[][],
		visited: boolean[][],
	): boolean {
		return true;
	}
}
