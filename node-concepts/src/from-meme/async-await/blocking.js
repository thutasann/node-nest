const fs = require('fs');

console.log('Start reading file...');

// Blocking I/O operation
const data = fs.readFileSync('test.txt', 'utf-8');
console.log('fileContent read:');

console.log('File read operation completed...');
