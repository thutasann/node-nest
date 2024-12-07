// @ts-check
const httpProxy = require('http-proxy');

/** proxy server */
const proxy = httpProxy.createProxyServer({});

/**
 * least connections
 * @param {any[]} servers - target servers
 * @param {*} req - incoming request
 * @param {*} res - server response
 */
const leastConnections = (servers, req, res) => {
	servers.sort((a, b) => a.connections - b.connections);

	console.log('servers', servers);

	const target = servers[0];
	target.connections++;
	console.log('leastConnections target', target);
	proxy.web(req, res, { target: `http://${target.host}:${target.port}` });

	res.on('finish', () => {
		target.connections--;
	});
};

module.exports = leastConnections;
