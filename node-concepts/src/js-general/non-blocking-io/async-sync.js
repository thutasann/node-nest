const fs = require('fs');
const path = require('path');

/** @internal */
function syncFunction() {
	console.log('Synchronous function is executed!');
}

// Asynchronous function outside main
async function outsideAsyncFunction() {
	console.log('Outside async function started. ===> 2️⃣');
	await delay(1000); // Simulate some async work
	console.log('Outside async function finished after 1 second. 2️⃣');
}
// Asynchronous function that reads a file
async function readFileAsync(filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

async function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * ## Main
 * - The await inside the main function does not block functions outside of main.
 * - It only pauses the execution of the main function itself until the promise resolves,
 * - but it does not block the entire Node.js event loop.
 */
async function main() {
	console.log('Main function started. ==> 1️⃣');

	console.log('Before file read... 1️⃣');
	try {
		const fileContent = await readFileAsync('file1.txt');
		console.log('File Content: Finished... 1️⃣');
	} catch (err) {
		console.error('Error reading file:', err);
	}

	console.log('Waiting for 2 seconds... 1️⃣');
	await delay(2000);
	console.log('2 seconds passed. 1️⃣');

	console.log('Main function finished. ==> 1️⃣');
}

main();

outsideAsyncFunction();
