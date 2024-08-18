const fs = require('fs');

/** Synchronous function for expensive computation */
function computeExpensiveValue(x) {
	let result = 0;
	for (let i = 0; i < 1e8; i++) {
		result += x * i;
	}
	return result;
}

/** Asynchronous function for writing data to a file */
function writeDataToFile(filename, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, data, 'utf-8', (error) => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
}

/** process and save data */
(async function processAndSaveData() {
	// Synchronous computation
	console.log('Starting synchronous computation...');
	const result = computeExpensiveValue(5);
	console.log('Computed value: ', result + '\n');

	// Asynchronous I/O operation
	console.log('Starting asynchronous file write...');
	try {
		await writeDataToFile('output.txt', `Computed value is ${result}`);
		console.log('File write operation completed successfully\n');
	} catch (error) {
		console.error('Error writing file:', error);
	}

	console.log('Function execution completed.');
})();
