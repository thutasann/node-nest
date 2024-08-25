const Store = require('./store');
const inventory = require('./inventory.json');

const skiShop = new Store('Steep and Deep', inventory);

var searchItem = 'powder skis';
var results = skiShop.find(searchItem);

console.log(results);
