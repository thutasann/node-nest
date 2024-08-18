const process = require('process');

console.log('Child process started');

process.on('SIGTERM', () => {
	console.log('Child process received SIGTERM exiting... ');
	process.exit(0); // Gracefully exit
});

setInterval(() => {
	console.log('Child process is still running...');
}, 1000);
