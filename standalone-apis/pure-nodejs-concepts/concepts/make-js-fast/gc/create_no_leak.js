/**
 * - The temporary variable is a local variable and goes out of scope after the function ends.
 * - `temporary` is not stored anywhere and goes out of scope
 * - Since nothing references the allocated array, the garbage collector reclaims its memory.
 */
function createNoLeak() {
	let temporary = new Array(1_000_000).fill('no leak');
}

setInterval(createNoLeak, 1000); // Memory usage remains stable
