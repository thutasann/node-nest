// @ts-check
const http = require('http');
const cpuIntensiveTask = require('./utils/cpuIntensiveTask');
const servers = require('./config.json').servers;

/**
 * Create Server
 * @param {string} host - server host
 * @param {number} port - server port
 * @param {number} timeout - server timeout
 */
const createServer = (host, port, timeout) => {
	http
		.createServer(async (req, res) => {
			try {
				setTimeout(() => {
					res.writeHead(200, { 'Content-Type': 'text/plain' });
					res.end(`Server response from port: ${port}`);
				}, timeout);
			} catch (error) {
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end(`Error: ${error.message}`);
			}
		})
		.listen(port, host, () => {
			console.log(`Server is running at http://${host}:${port}`);
		});
};

servers.forEach((server) =>
	createServer(server.host, server.port, server.timeout),
);
