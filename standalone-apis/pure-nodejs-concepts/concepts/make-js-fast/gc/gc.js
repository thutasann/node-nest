const util = require('util');

/**
 * - After the console.log statement executes, the function exits, and the local scope of the function is destroyed.
 * - `temp` goes out of scope after the function ends
 * - `temp` becomes garbage after the function execution.
 */
function createObject() {
	let temp = { value: 42 }; // `temp` is created and referenced
	console.log(temp, '\n');
}

/**
 * - JavaScript handles circular references automatically as long as objects are unreachable.
 */
function createCircular() {
	let obj1 = { name: 'Alice', age: 25, hobbies: ['reading', 'coding'] };
	let obj2 = { name: 'Emily', age: 25, hobbies: ['reading', 'coding'] };
	obj1.ref = obj2; // obj1 refers to obj2
	obj2.ref = obj1; // ojb2 refers back to obj1
	return obj1; // obj1 is returned and still referenced
}

// ---- Local Scope
createObject();

// ---- Circular References
let circular = createCircular();
circular = null;
const circularObjSize = Buffer.byteLength(util.inspect(circular));
console.log('circularObjSize', circularObjSize, '\n');

// ---- util.inspect()
const obj = { name: 'Alice', age: 25, hobbies: ['reading', 'coding'] };
const objSize = Buffer.byteLength(util.inspect(obj));
console.log('objSize', objSize, '\n');

// ---- memory usage check
const memoryUsage = process.memoryUsage();
console.log('memoryUsage', memoryUsage);
