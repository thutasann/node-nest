class Animal {
	constructor(name) {
		this.name = name;
	}
}

class Mammal extends Animal {
	constructor(name) {
		super(name);
	}

	breathe() {
		console.log(this.name + ' breathe');
	}
}

class Canine extends Mammal {
	constructor(name) {
		super(name);
	}

	howl() {
		console.log(this.name + ' howl');
	}
}

class ExtendedDog extends Canine {
	constructor(name) {
		super(name);
	}

	wagTail() {
		console.log(this.name + ' wagTail');
	}
}

const proto_dog = new ExtendedDog('Ok');
const proto = Object.getPrototypeOf(proto_dog);
console.log('proto', proto);
