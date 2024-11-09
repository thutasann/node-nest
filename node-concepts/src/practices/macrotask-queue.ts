/**
 * ## MacroTask Queue Explanation
 * - console.log('Start') and console.log('End') run first, as they're synchronous.
 * - process.nextTick runs immediately after the synchronous code, as it’s a microtask.
 * - Promise resolution runs next, as it's also in the microtask queue.
 * - After all microtasks complete, macrotasks in the event loop execute: setTimeout and setImmediate.
 */
const explanation = {};

console.log('Start');

// A macrotask using setTimeout
setTimeout(() => {
	console.log('setTimeout 1'); // This will be logged after all microtasks finish
}, 0);

// A macrotask using setImmediate
setImmediate(() => {
	console.log('setImmediate'); // This is also a macrotask and will run after the current macrotask
});

// A microtask using process.nextTick
process.nextTick(() => {
	console.log('process.nextTick'); // This is a microtask and will run before any macrotask
});

// A microtask with Promise
Promise.resolve().then(() => {
	console.log('Promise'); // Microtasks are prioritized over macrotasks
});

console.log('End');
