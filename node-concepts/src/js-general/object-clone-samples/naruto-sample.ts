class NinjaShadowClone {
	cloneName: string;
	energy: number;

	constructor(cloneName: string) {
		this.cloneName = cloneName;
		this.energy = 100;
	}

	performJutsu() {
		if (this.energy > 0) {
			console.log(
				`${this.cloneName} performs a jutsu with ${this.energy}% energy!`,
			);
			this.energy -= 20;
		} else {
			console.log(`${this.cloneName} is too exhausted to perform a jutsu.`);
		}
	}

	disappear() {
		console.log(`${this.cloneName} disappears in a puff of smoke!`);
	}
}

/** Shadow Clone Sample (Naruto) */
class Ninja {
	name: string;
	cloneCount: number;

	constructor(name: string) {
		this.name = name;
		this.cloneCount = 0;
	}

	performJutsu() {
		console.log(`${this.name} performs a jutsu!`);
	}

	createShadowClone(): NinjaShadowClone {
		this.cloneCount++;
		return new NinjaShadowClone(`${this.name} Clone #${this.cloneCount}`);
	}
}

const naruto = new Ninja('Naruto');
const clone1 = naruto.createShadowClone();
const clone2 = naruto.createShadowClone();

naruto.performJutsu(); // Naruto performs a jutsu!
clone1.performJutsu(); // Naruto Clone #1 performs a jutsu with 100% energy!
clone2.performJutsu(); // Naruto Clone #2 performs a jutsu with 100% energy!

clone1.performJutsu(); // Naruto Clone #1 performs a jutsu with 80% energy!
clone1.disappear(); // Naruto Clone #1 disappears in a puff of smoke!
