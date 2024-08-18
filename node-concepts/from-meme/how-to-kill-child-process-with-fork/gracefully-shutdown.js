const http = require('http');

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World\n');
});

server.listen(5000, () => {
	console.log('Server running at http://localhost:5000/');
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
	console.log('Received shutdown signal, closing server...');

	// Stop accepting new requests
	server.close(() => {
		console.log('Server closed');

		// Perform cleanup tasks here, like closing database connections

		// Exit process
		process.exit(0);
	});

	// Set a timeout to forcefully shut down if it takes too long
	setTimeout(() => {
		console.error('Forced shutdown');
		process.exit(1);
	}, 10000); // 10-second timeout for forced shutdown
}
