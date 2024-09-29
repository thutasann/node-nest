/**
 * ## Redux State Shadow Clone (Shallow Copy)
 * - shallow clones are often used when updating part of a state
 * - this ensures immutability by copying the top-level state object
 * - but nested objects are still shared between new and old state if not directly modified
 */
const state = {
	user: {
		name: 'Naruto',
		age: 17,
	},
	settings: {
		theme: 'dark',
	},
};

/**
 * Shallow copy in reducer to update part of state
 * - Only `settings` object is modified; `user` object remains unchanged.
 */
const newState = {
	...state, // shallow clone
	settings: {
		theme: 'light', // update a nested property
	},
};

console.log('initial state -> ', state);
console.log('newState -> ', newState);
