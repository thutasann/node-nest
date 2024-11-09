// @ts-check
const express = require('express');
const path = require('path');
const { closeDBConnection } = require('./utils/db');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
	res.send('<h1>Hello from About Page</h1>');
});

const server = app.listen(3000, () => {
	console.log(`Server is listening on port : http://localhost:3000`);
});

// Signal Termination
process.on('SIGTERM', () => {
	console.log('\n\nSIGTERM signal received.');
	server.close(() => {
		console.log('Closed out remaining connections\n\n');
		closeDBConnection();
		process.exit(0);
	});
});

// Signal Interruption
process.on('SIGINT', () => {
	console.log('SIGINT signal received.');
	server.close(() => {
		console.log('Closed out remaining connections!');
		closeDBConnection();

		process.exit(0);
	});
});
