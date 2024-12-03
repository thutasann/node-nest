// ----- Reflect.set/Reflect.get
const obj = { name: 'John', age: 30 };
console.log(Reflect.get(obj, 'name'));

Reflect.set(obj, 'age', 35);
console.log('obj age', obj.age);

// ------ Relect.has
console.log('hasName -> ', Reflect.has(obj, 'name'));

// ------ Relect.apply
function greet(message) {
	return `${message}, ${this.name}`;
}
const person = { name: 'Alice' };

const apply_result = Reflect.apply(greet, person, ['Hello']);
console.log('apply_result', apply_result);

// ------ Relect.construct
class Person {
	constructor(name) {
		this.name = name;
	}
}

const john = Reflect.construct(Person, ['John']);
console.log(john.name);
