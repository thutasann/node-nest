// @ts-check
const http = require('http');

/**
 * Create Server
 * @param {string} host - server host
 * @param {number} port - server port
 */
const createServer = (host, port) => {
	http
		.createServer((req, res) => {
			res.write(200);
			res.end(`Server response from port: ${port}`);
		})
		.listen(port, host, () => {
			console.log(`Server is running at http://${host}:${port}`);
		});
};

createServer('localhost', 3001);
createServer('localhost', 3002);
createServer('localhost', 3003);
createServer('localhost', 3004);
