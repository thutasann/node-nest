/**
 * ## Recommendation
 * - Use mutable operations when performance is critical and immutability is unnecessary.
 * - Use immutable patterns for reliability and maintainability when working in state-heavy applications like React, but optimize with tools like Immer for large data.
 */
const recommendation = {};

// ------------------ Mutable

const mutable = { name: 'Alice', age: 25 };
mutable.age = 26;
console.log('mutable', mutable);

const mutable_arrays = [1, 2, 3];
mutable_arrays.push(4);
console.log('mutable_arrays', mutable_arrays);

const largeArray = new Array(1_000_000).fill(0);
largeArray[999_999] = 1;
console.log('largeArray', largeArray);

// ------------------ Immutable (Instead of mutating, create a new object or array)

// Immutable update of an object
const person = { name: 'Alice', age: 25 };
const updatedPerson = { ...person, age: 26 };
console.log('\nupdatedPerson', updatedPerson);

// Immutable update of an array
const numbers = [1, 2, 3];
const updatedNumbers = [...numbers, 4];
console.log('updatedNumbers', updatedNumbers);
