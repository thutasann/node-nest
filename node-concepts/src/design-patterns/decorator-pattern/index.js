'use strict';

const Shopper = require('./shopper');
const {
	InventoryPattern,
	DiamondInventoryItem,
	GoldenInventoryItem,
} = require('./inventory-item');

var alex = new Shopper('Alex', 4000);

var walkman = new InventoryPattern('walkman', 29.99);
var necklace = new InventoryPattern('necklace', 9.99);

var gold_necklace = new GoldenInventoryItem(necklace);
var diamond_gold_necklace = new DiamondInventoryItem(gold_necklace);
var diamond_walkman = new DiamondInventoryItem(walkman);

alex.purchase(diamond_gold_necklace);
alex.purchase(diamond_walkman);
alex.printStatus();
diamond_walkman.print();
