const { writeFile, existsSync, readFileSync, unlink } = require('fs');

const localStorageFileName = 'localStorage.json';

class LocalStorage {
	constructor() {
		if (existsSync(localStorageFileName)) {
			console.log('Loading items from existing localStorage.json');
			const txt = readFileSync(localStorageFileName);
			this.items = JSON.parse(txt);
		} else {
			this.items = {};
		}
	}

	get length() {
		return Object.keys(this.items).length;
	}

	getItem(key) {
		return this.items[key];
	}

	setItem(key, value) {
		this.items[key] = value;
		writeFile('localStorage.json', JSON.stringify(this.items), (error) => {
			if (error) {
				console.error(error);
			}
		});
	}

	clear() {
		this.items = {};
		unlink(localStorageFileName, () => {
			console.log('LocalStorage file removed');
		});
	}
}

module.exports = new LocalStorage();
