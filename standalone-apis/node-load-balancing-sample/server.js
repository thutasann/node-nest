// @ts-check
const http = require('http');
const roundRobin = require('./utils/round-robin');
const serverConfig = require('./config.json').servers;

const servers = serverConfig.map((server) => ({
	...server,
}));

const loadBalancingAlgorithm = 'roundRobin';

const server = http.createServer((req, res) => {
	if (loadBalancingAlgorithm === 'roundRobin') {
		roundRobin(servers, req, res);
	} else {
		res.writeHead(500);
		res.end('Load balancing alogrithm is not supported!');
	}
});

server.listen(3000, () => {
	console.log(`Load balancer running on port http://localhost:3000`);
});
