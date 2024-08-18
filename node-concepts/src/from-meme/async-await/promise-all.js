const performTask1 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('Task 1 complete');
			resolve('Result 1');
		}, 3000);
	});
};

const performTask2 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('Task 2 complete');
			resolve('Result 2');
		}, 2000);
	});
};

const performTask3 = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log('Task 3 complete');
			resolve('Result 3');
		}, 1000);
	});
};

(async function runTasksInParallel() {
	try {
		console.log('Starting Tasks...');

		const results = await Promise.all([
			performTask1(),
			performTask2(),
			performTask3(),
		]);

		console.log('All Tasks completed', results + '\n');
	} catch (error) {
		console.error('An error occured: ', error);
	}
})();

(async function runTasksInParallelWithoutPromiseAll() {
	try {
		console.log('Starting Tasks...');

		// Start all tasks concurrently
		const task1 = performTask1();
		const task2 = performTask2();
		const task3 = performTask3();

		// Await each task individually
		const result1 = await task1;
		const result2 = await task2;
		const result3 = await task3;

		console.log('All Tasks completed', [result1, result2, result3]);
	} catch (error) {
		console.error('An error occured: ', error);
	}
})();
