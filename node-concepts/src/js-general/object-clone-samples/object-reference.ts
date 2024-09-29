/**
 * ## Object referencing
 * - refers to how objects are stored and accessed in memory
 * - When you create an object and assign it to a variable,
 * - that variable doesn't store the actual object;
 * - instead, it stores a reference to the location in memory where the object is stored.
 * ### Key Concepts of Object Referencing:
 * #### Reference Type:
 * - Objects, arrays, and functions in JavaScript are reference types.
 * - When you assign an object to a variable or pass it to a function,
 * - you're copying the reference to that object, not the object itself.
 * #### Shared Reference:
 * - If two variables hold the same reference to an object,
 * - changes made to the object through one variable will be reflected when accessed through the other,
 * because both variables refer to the same object in memory.
 * ### To Avoid Object Referencing:
 * - Deep cloning is used to create independent copies of an object, ensuring that changes to the copy do not affect the original object.
 */
const explain = {};

/** original object */
const originalObject = { name: 'Naruto', age: 17 };

/** assigning the object reference to another variable */
const anotherReference = originalObject;

/** modifying the object through the new reference */
anotherReference.age = 18;

/** modify the shallow clone */

// ouput -> 18
console.log('originalObject --> ', originalObject);
console.log('anotherReference --> ', anotherReference);

console.log('------ Shallow Clone Reference Example ------');

/** Original Object */
const original = {
	name: 'Naruto',
	skills: {
		jutsu: 'Rasengan',
	},
};

/** Shallow clone */
const shallowClone = { ...original };

// Modify the nested object in the shallow clone
shallowClone.skills.jutsu = 'Shadow Clone Jutsu';

// Both the original and shallowClone are affected because `skills` is a reference
console.log('Original ---> ', original.skills.jutsu); // Output: "Shadow Clone Jutsu"
console.log('Shallow ---> ', shallowClone.skills.jutsu); // Output: "Shadow Clone Jutsu"
