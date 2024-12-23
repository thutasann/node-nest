let state = { counter: 0 };

/**
 * - Instead of modifying the state, create a new copy with the changes.
 */
function increment(state) {
	return {
		...state,
		counter: state.counter + 1,
	};
}

state = increment(state);

console.log('state', state);
