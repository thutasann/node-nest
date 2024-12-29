// @ts-check
class Dog {
	constructor(name) {
		this.username = name;
		this.wagTail = () => {
			return 'Wagging tail';
		};
	}

	bark() {
		return 'Woof!';
	}
}

const dog1 = new Dog('Max');
const dog2 = new Dog('Max2');

/** true: both invoked and return the same string: */
const statement_1 = dog1.wagTail() === dog2.wagTail();

/** false: wagtail is a function defined within the constructor so each time this is a new function that is being created */
const statement_2 = dog1.wagTail === dog2.wagTail;

/** true: bark is defined as a method on the class prototype (Dog.prototype). */
const statement_3 = dog1.bark === dog2.bark;

/** true: Both dog1 and dog2 are instances of the same Dog class and thus share the same prototype. */
const statement_4 = Object.getPrototypeOf(dog1) === Object.getPrototypeOf(dog2);

/** true: The constructor property points to the function that created the instance. Both dog1 and dog2 were created using the same Dog constructor function. */
const statement_5 = dog1.constructor === dog2.constructor;

console.log({
	statement_1,
	statement_2,
	statement_3,
	statement_4,
	statement_5,
});

const dog_prototype = Dog.prototype;
console.log('dog_prototype.bark', dog_prototype.bark);
console.log('dog.constructor', dog1.constructor);
