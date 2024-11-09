const obj1 = {
	name: 'John',
	age: 30,
	address: {
		city: 'New York',
		zip: '10001',
	},
};

const obj2 = {
	name: 'John',
	age: 30,
	address: {
		city: 'New York',
		zip: '10001',
	},
};

const resultOne = obj1.address === obj2.address;
const resultTwo = JSON.stringify(obj1.address) === JSON.stringify(obj2.address);
console.log({ resultOne, resultTwo });

console.log('--------');

/**
 * ## Shallow Eqiality
 * - only compares the immediate properties of objects
 * - use strict equality `===`
 * - faster performance
 * - return true only if object properties reference the same memory locations
 * - good for simple comparisons or when you know objects share references
 */
function shallowEqual(obj1, obj2): boolean {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	return keys1.every((key) => obj1[key] == obj2[key]);
}

/**
 * ## Deep Equality
 * - recursively compares all nested properties
 * - compares actual values rather than just references
 * - more CPU intensive for complex objects
 * - returns true if all values are equal, regardless of reference
 * - better for comparing complex data structures
 */
function deepEqual(obj1, obj2) {
	// check if primitives or same reference
	if (obj1 === obj2) return true;

	// check if both are objects and not null
	if (
		typeof obj1 !== 'object' ||
		typeof obj2 !== 'object' ||
		obj1 == null ||
		obj2 == null
	) {
		return false;
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) return false;

	return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
}

console.log('Shallow Equal', shallowEqual(obj1, obj2)); // false
console.log('Deep Equal:', deepEqual(obj1, obj2)); // true

console.log('--------');

// Example showing why shallow equality returns false
const address1 = { city: 'New York', zip: '10001' };
const simpleObj1 = { name: 'John', address: address1 };
const simpleObj2 = { name: 'John', address: address1 };
const simpleObj3 = {
	name: 'John',
	address: { city: 'New York', zip: '10001' },
};

console.log(
	'Shallow Equal (same reference):',
	shallowEqual(simpleObj1, simpleObj2),
); // true

/**
 * - simpleObj1.address points to address1.
 * - simpleObj3.address is a new object { city: 'New York', zip: '10001' }, even though it has the same content as address1.
 * - it finds that they are different references in memory.
 */
console.log(
	'Shallow Equal (different reference):',
	shallowEqual(simpleObj1, simpleObj3),
); // false
