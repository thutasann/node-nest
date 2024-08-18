const fs = require('fs');

console.log('Start reading file...');

// Non-blocking I/O operation
fs.readFile('test.txt', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}
	console.log('File content read :');
});

console.log('File read operation initiated...');
