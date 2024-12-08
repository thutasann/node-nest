class MyInstance {
	/**
	 * Instance Object
	 * @param {string} name - instance name
	 */
	constructor(name) {
		this.name = name;
	}

	sayHello() {
		console.log(`Hello From ${this.name}`);
	}
}

const instance1 = new MyInstance('Instance 1');
const instance2 = new MyInstance('Instance 2');

instance1.sayHello();
instance2.sayHello();
