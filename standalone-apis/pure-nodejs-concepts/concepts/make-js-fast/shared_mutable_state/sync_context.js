let sharedState = { counter: 0 };

function increment() {
	sharedState.counter += 1;
}

function decrement() {
	sharedState.counter -= 1;
}

increment();
decrement();

console.log('sharedState.counter', sharedState.counter);
