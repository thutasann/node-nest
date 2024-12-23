// Global reference prevents garbage collection
let leaks = [];

/**
 * - The `leaks` array retains a reference to every allocated array.
 * - These objects remain in memory because they are still reachable through the leaks array.
 */
function createLeak() {
	let unused = new Array(1_000_000).fill('leak');
	leaks.push(unused); // keeps a reference to `unused`
}

setInterval(createLeak, 1000); // Memory usage grows endlessly
