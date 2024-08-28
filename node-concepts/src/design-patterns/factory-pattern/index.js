const userFactory = require('./user-factory');

const alex = userFactory('Alex Banks', 100);
const eve = userFactory('Eve Porcello', 100, 'employee', 'Facebook');

eve.payDay(100);

console.log(alex.toString());
console.log(eve.toString());
