/**
 * fibonacci
 */
export function fibonacci(n: number) {
	if (n <= 1) {
		return n;
	}
	return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * simulate a CPU-intensive task
 */
export function heavyComputation(data: any): any {
	let sum = 0;
	for (let i = 0; i < 10; i++) {
		sum += i;
	}
	return sum;
}
