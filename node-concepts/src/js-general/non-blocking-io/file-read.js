const fs = require('fs');

fs.readFile('file1.txt', 'utf8', (err, data1) => {
	if (err) {
		console.error('Error reading file1:', err);
		return;
	}
	console.log('File1 content:', data1);
});

fs.readFile('file2.txt', 'utf8', (err, data2) => {
	if (err) {
		console.error('Error reading file2:', err);
		return;
	}
	console.log('File2 content:', data2);
});

console.log('Files are being read concurrently.');
