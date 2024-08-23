/**
 * @typedef { Object } BaseItem
 * @property { string } name - The name of the base item
 * @property { number } price - The price of the base item
 */

class InventoryPattern {
	constructor(name, price) {
		this.name = name;
		this.price = price;
	}

	print() {
		console.log(`${item.name} costs ${item.price}`);
	}
}

class GoldenInventoryItem {
	/**
	 *
	 * @param {BaseItem} baseItem
	 */
	constructor(baseItem) {
		this.name = `Golden ${baseItem.name}`;
		this.price = 1000 + baseItem.price;
	}
}

class DiamondInventoryItem {
	constructor(baseItem) {
		this.name = `Diamond ${baseItem.name}`;
		this.price = 1000 + baseItem.price;
		this.cutsGlass = true;
	}

	print() {
		console.log(`${this.name} costs a lot of money...`);
	}
}

module.exports = {
	InventoryPattern,
	GoldenInventoryItem,
	DiamondInventoryItem,
};
