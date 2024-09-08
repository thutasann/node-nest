import { Logger } from '@nestjs/common';

/**
 * Rotate Image
 * - given an `n x n` 2D `matrix` representing an image
 * - rotate the image by 90 degrees (clockwise)
 * @example
 * - Input -> [[1,2,3], [4,5,6], [7,8,9]]
 * - Output -> [[7,4,1], [8,5,2], [9,6,3]]
 * @description
 * - 1 2 3 // 1 4 7 // 7 4 1
 * - 4 5 6 // 2 5 8 // 8 5 2
 * - 7 8 9 // 3 6 9 // 9 6 3
 */
export abstract class RotateImage {
	static logger = new Logger(RotateImage.name);

	/** Rotate Image Solution Two */
	public static solutionOne(matrix: number[][]): void {
		/** number of rows and columns */
		const n = matrix.length;

		// Step 1 : Transpose the matrix (swag rows with columns)
		for (let i = 0; i < n; i++) {
			for (let j = i + 1; j < n; j++) {
				const temp = matrix[i][j];
				matrix[i][j] = matrix[j][i];
				matrix[j][i] = temp;
			}
		}

		// Step 2: : Reverse each rows
		for (let i = 0; i < n; i++) {
			matrix[i].reverse();
		}
	}

	/** Rotate Image Usage Two */
	public static usageOne() {
		const matrix = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];

		this.solutionOne(matrix);
		this.logger.debug(` ------>> Rotated Image : ${matrix}`);
	}
}
