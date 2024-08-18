const { fork } = require('child_process');
const child = fork('./child.js');

setTimeout(() => {
	console.log('Killing the child process');
	child.kill('SIGTERM');
}, 5000);
