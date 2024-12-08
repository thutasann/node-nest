// @ts-check
let fiboMemo = {};

function fibonacci(n) {
	if (n <= 1) return n;

	if (fiboMemo[n]) return fiboMemo[n];

	fiboMemo[n] = fibonacci(n - 1) + fibonacci(n - 2);

	return fiboMemo[n];
}

console.log(fibonacci(40));
