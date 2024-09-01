// Here’s a simple TypeScript example of DFS used to solve a maze:

type Cell = {
	x: number;
	y: number;
};

/** Maze Representation: A 2D array where 1 represents passable cells and 0 represents walls. */
const maze: number[][] = [
	[1, 1, 0, 1, 0],
	[1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1],
	[1, 1, 1, 1, 1],
	[0, 0, 0, 0, 1],
];

const directions: Cell[] = [
	{ x: 0, y: 1 }, // right
	{ x: 1, y: 0 }, // down
	{ x: 0, y: -1 }, // left
	{ x: -1, y: 0 }, // up
];

function isValidMove(x: number, y: number): boolean {
	return (
		x >= 0 &&
		x < maze.length &&
		y >= 0 &&
		y < maze[0].length &&
		maze[x][y] === 1
	);
}

function depthFirstSearchMaze(
	start: Cell,
	end: Cell,
	path: Cell[] = [],
): boolean {
	const { x, y } = start;

	if (!isValidMove(x, y) || path.some((cell) => cell.x === x && cell.y === y)) {
		return false;
	}

	path.push(start);

	if (x === end.x && y === end.y) return true;

	for (const direction of directions) {
		const newX = x + direction.x;
		const newY = y + direction.y;

		if (depthFirstSearchMaze({ x: newX, y: newY }, end, path)) {
			return true;
		}
	}

	path.pop();
	return false;
}

const start: Cell = { x: 0, y: 0 };
const end: Cell = { x: 4, y: 4 };
const path: Cell[] = [];

if (depthFirstSearchMaze(start, end, path)) {
	console.log('Path found:', path);
} else {
	console.log('No path found.');
}
