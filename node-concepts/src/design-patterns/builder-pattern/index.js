const PersonBuilder = require('./person-builder');

const sue = new PersonBuilder('Sue').makeEmployee().makeManager(60).build();

const charles = new PersonBuilder('Charles')
	.withMoney(500)
	.withShoppingList(['jeans', 'sunglasses'])
	.build();

console.log('sue', sue.tostring());
console.log('charles', charles.tostring());
