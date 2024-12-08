// @ts-check
const http = require('http');

function createServer(port) {
	const server = http.createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(`Hello from server running on port ${port}\n`);
	});

	server.listen(port, () => {
		console.log(`Server is running on port http://localhost:${port}/`);
	});

	return server;
}

const ports = [3000, 3001, 3002]; // Define the ports
ports.map((port) => createServer(port));
