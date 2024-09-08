import { Logger } from '@nestjs/common';

/* eslint-disable prefer-const */
export abstract class NumberOfIslands {
	static logger = new Logger(NumberOfIslands.name);

	/**
	 * Number of Island
	 * @param { string[][] } grid - Two Dimensional Array
	 * @returns { number }
	 */
	public static solutionOne(grid: string[][]): number {
		let countIslands = 0;

		for (let rowIndex in grid) {
			for (let colIndex in grid[rowIndex]) {
				if (grid[rowIndex][colIndex] === '1') {
					countIslands++;
					this.teraform(parseInt(rowIndex), parseInt(colIndex), grid);
				}
			}
		}

		return countIslands;
	}

	/** Usage */
	public static usageOne() {
		this.logger.debug(' ------>> Number of IsLands ');
		const result = this.solutionOne([
			['1', '1', '0', '0', '0'],
			['1', '1', '0', '0', '0'],
			['0', '0', '1', '0', '0'],
			['0', '0', '0', '1', '1'],
		]);
		console.log('Number of Islands : >>', result);
	}

	/**
	 * Helper: Convert stuff arround us to Water
	 * @private
	 */
	private static teraform(
		rowIn: number,
		colIn: number,
		grid: string[][],
	): void {
		if (
			grid[rowIn] === undefined ||
			grid[rowIn][colIn] === undefined ||
			grid[rowIn][colIn] === '0'
		)
			return;

		grid[rowIn][colIn] = '0';

		NumberOfIslands.teraform(rowIn + 1, colIn, grid); // top
		this.teraform(rowIn - 1, colIn, grid); // bottom
		this.teraform(rowIn, colIn + 1, grid); // right
		this.teraform(rowIn, colIn - 1, grid); // left
	}
}
