/**
 * ## Key Differences:
 * - Shadow Clone: Uses spread syntax `({ ...originalNinja })`, and it creates a shallow copy. Modifying nested objects in the clone affects the original because they share references.
 * - Deep Clone: Uses JSON.parse(JSON.stringify()) to create a full copy of all nested objects. Modifying nested objects in the deep clone doesn't affect the original.
 * @abstract
 * - Shallow -> Update Original Object
 * - Deep -> Doesn't Update Original Object
 */
const keeyDifferences = {};

/**
 * ## Summary
 * ### Shallow Clone
 * - Efficient for updating top-level properties.
 * - Commonly used in state management (like Redux) to ensure immutability without deep copying.
 * - Best when you only need to update part of an object and want to maintain references to nested data.
 * ### Deep Clone
 * - Useful for manipulating or transforming complex nested data structures.
 * - Ideal in scenarios where original data should remain untouched, such as in form validation or handling API requests.
 * - Provides a clean separation between the original object and its manipulated copy.
 */
const summary = {};

/** original object */
const originalNinja = {
	// top-level property
	name: 'Naruto',
	// Not a top-level property, it's an object
	skills: {
		jutsu: 'Rasengan',
		rank: 'Genin',
	},
};
console.log('originalNinja -> ', originalNinja, '\n');

/**
 * shadow clone (shallow copy)
 * - only copies the top-level properties
 */
const shadowClone = { ...originalNinja };

/**
 * deep clone
 * - deeply copies all nested objects
 */
const deepClone = JSON.parse(JSON.stringify(originalNinja));

// Modifying shallow clone
// Output: "Shadow Clone Jutsu" - since it's a shallow copy, the reference to the nested object is shared
shadowClone.skills.jutsu = 'Shadow Clonse Jutsu';
console.log('(after shadow clone modified) -> :', originalNinja, '\n');

// Modifying deep clone
// Output: "Shadow Clone Jutsu" - deep clone's change doesn't affect the original object
deepClone.skills.jutsu = 'Chidori';
console.log('(after deep clone modification):', originalNinja, '\n');
