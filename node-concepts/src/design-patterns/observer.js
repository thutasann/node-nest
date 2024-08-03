const http = require('http');
const { EventEmitter } = require('node:events');

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Your own server here');
});

server.on('error', (error) => {
	console.log('Error :>> ', error);
});

server.listen(3000, '127.0.0.1', () => {
	console.log('Server up and running');
});

/**
 * The Observer pattern is basically consisting of two parties
 * - and observable and the Observer
 * - observable in this case is the server
 * - observers are things lik server.on, error or server.listen
 * - we're listening to different kind of events and then we're reacting on them
 */
class Observable {
	constructor() {
		this.observers = {};
	}

	on(input, observer) {
		if (!this.observers[input]) this.observers[input] = [];
		this.observers[input].push(observer);
	}

	triggerInput(input, params) {
		this.observers[input].forEach((o) => {
			o.apply(null, params);
		});
	}
}

class Server extends Observable {
	constructor() {
		super();
	}

	triggerError() {
		let errorObject = {
			errorCode: 500,
			message: 'Port already in use',
		};
		this.triggerInput('error', [errorObject]);
	}
}

const eventEmitter = new EventEmitter();

eventEmitter.on('userDeleted', (email) => {
	console.log('User with email: ', email, ' has been deleted');
});

eventEmitter.emit('userDeleted', 'test@gamil.com');
