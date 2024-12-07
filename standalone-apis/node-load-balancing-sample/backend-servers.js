// @ts-check
const http = require('http');
const servers = require('./config.json').servers;

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

servers.forEach((server) => createServer(server.host, server.port));
