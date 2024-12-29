function* generatorFunction() {
	yield 1; // First iteration: yields 1
	yield 2; // Second iteration: yields 2
	yield 3; // Third iteration: yields 3
	return 4; // Ends the generator; the return value (4) is ignored by `for...of`
}

console.log([...generatorFunction()]);

for (const value of generatorFunction()) {
	console.log(value); // 1,2,3
}
