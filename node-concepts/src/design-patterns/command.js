class BaseCommand {
	constructor(opts) {
		if (!opts) {
			throw new Error('Missing options object');
		}
	}

	run() {
		throw new Error('Method not implemented');
	}
}

class LogCommand extends BaseCommand {
	constructor(opts) {
		super(opts);
		this.msg = opts.msg;
		this.level = opts.level;
	}

	run() {
		console.log(`Log : (level -> ${this.level} ) : message : ${this.msg}`);
	}
}

class WelcomeCommand extends BaseCommand {
	constructor(opts) {
		super(opts);
		this.username = opts.usr;
	}

	run() {
		console.log('hello : ', this.username, ' welcome to the world!');
	}
}

let commands = [
	new WelcomeCommand({ usr: 'Thuta' }),
	new WelcomeCommand({ usr: 'Kyaw' }),
	new LogCommand({
		msg: 'This is a log message, careful now...',
		level: 'info',
	}),
	new LogCommand({
		msg: 'Something went wrong!',
		level: 'error',
	}),
];

commands.forEach((c) => {
	c.run();
});
