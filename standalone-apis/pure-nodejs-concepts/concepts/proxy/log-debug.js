const logHandler = {
	get(target, prop, receiver) {
		console.log(`Getting ${prop}`);
		return Reflect.get(...arguments);
	},
	set(target, prop, value) {
		console.log(`Setting ${prop} to ${value}`);
		return Reflect.set(...arguments);
	},
};

const loggedObject = new Proxy({}, logHandler);

loggedObject.a = 1;
console.log(loggedObject.a);
