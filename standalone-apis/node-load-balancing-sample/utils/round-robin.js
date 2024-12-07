// @ts-check
const httpProxy = require('http-proxy');

/** proxy server */
const proxy = httpProxy.createProxyServer({});

/** current server */
let current = 0;

/**
 * round robin
 * @param {any[]} servers - target servers
 * @param {*} req - incoming request
 * @param {*} res - server response
 */
const roundRobin = (servers, req, res) => {
	const target = servers[current];
	console.log('round-robin target...', target);
	current = (current + 1) % servers.length;
	proxy.web(req, res, { target: `http://${target.host}:${target.port}` });
};

module.exports = roundRobin;
