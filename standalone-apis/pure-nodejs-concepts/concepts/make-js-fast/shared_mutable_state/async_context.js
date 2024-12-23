let sharedState = { counter: 0 };

function asyncIncrement() {
	setTimeout(() => {
		sharedState.counter += 1;
		console.log('incremented: ', sharedState.counter);
	}, 1000);
}

function asyncDecrement() {
	setTimeout(() => {
		sharedState.counter -= 1;
		console.log('Decremented:', sharedState.counter);
	}, 1000);
}

asyncIncrement();
asyncDecrement();

console.log('sharedState', sharedState);
