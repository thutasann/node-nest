/** Type alias for two-dimensional array */
type Matrix = number[][];

/** Function to add matrices */
function addMatrices(matrix1: Matrix, matrix2: Matrix): Matrix {
	const result: Matrix = [];

	for (let i = 0; i < matrix1.length; i++) {
		const row: number[] = [];
		for (let j = 0; j < matrix1[i].length; j++) {
			row.push(matrix1[i][j] + matrix2[i][j]);
		}
		result.push(row);
	}

	return result;
}

/** Function to multipy matrices */
function multiplyMatrices(matrix1: Matrix, matrix2: Matrix): Matrix {
	const result: Matrix = [];

	for (let i = 0; i < matrix1.length; i++) {
		const row: number[] = [];
		for (let j = 0; j < matrix2[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < matrix1[0].length; k++) {
				sum += matrix1[i][k] * matrix2[k][j];
			}
			row.push(sum);
		}
		result.push(row);
	}

	return result;
}

/** transpose matrix */
function transposeMatrix(matrix: Matrix): Matrix {
	const result: Matrix = [];

	for (let i = 0; i < matrix[0].length; i++) {
		const row: number[] = [];
		for (let j = 0; j < matrix.length; j++) {
			row.push(matrix[j][i]);
		}
		result.push(row);
	}

	return result;
}

// --------------- Matrix Usages

/** 3x3 matrix1 */
const matrix1: Matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

/** 3x3 matrix2 */
const matrix2: Matrix = [
	[9, 8, 7],
	[6, 5, 4],
	[3, 2, 1],
];

const matrix3: Matrix = [
	[1, 2],
	[3, 4],
	[5, 6],
];

const matrix4: Matrix = [
	[7, 8, 9],
	[10, 11, 12],
];

console.log('Added Matrices : ', addMatrices(matrix1, matrix2));
console.log('Multiplied Matrices : ', multiplyMatrices(matrix3, matrix4));
console.log(transposeMatrix(matrix1));
