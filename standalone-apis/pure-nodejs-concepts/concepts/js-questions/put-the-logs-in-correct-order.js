// This creates a resolved promise, and the .then() callback is queued as a `microtask`.
Promise.resolve().then(() => console.log(1));

// This queues a callback in the `microtask` queue, just like the .then() in a resolved promise.
queueMicrotask(() => console.log(2));

// This schedules a callback as a `macrotask`.
setTimeout(() => console.log(3), 0);

// This is a regular synchronous statement and executes immediately.
console.log(4);

// the body of the new Promise is just executed synchronously
new Promise(() => console.log(5));

// This is an immediately invoked async function.
(async () => console.log(6))();

/**
 * ## Result
 * -  4,5,6,1,2,3
 * - This order reflects JavaScript's event loop behavior, where synchronous code runs first, then `microtasks`, followed by `macrotasks`.
 */
const logs_order_result = null;
