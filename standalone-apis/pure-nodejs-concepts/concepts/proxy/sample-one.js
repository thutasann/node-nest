// @ts-check
const target = {
	message: 'Hello, World!',
};

const handler = {
	get(target, prop, receiver) {
		console.log(`Getting ${prop}\n`);
		return prop in target ? target[prop] : `Prop ${prop} does not exist`;
	},
	set(target, prop, value) {
		console.log(`Setting ${prop} to ${value}\n`);
		target[prop] = value;
		return true;
	},
};

const proxy = new Proxy(target, handler);

console.log('initial message -> ', proxy.message, '\n');
proxy.message = 'Hello, Proxy';
console.log('proxy.message --> ', proxy.message);
