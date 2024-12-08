/** Custom Array */
class MyArray<T> {
	private _length = 0;
	private _data: Record<number, T> = {};

	constructor() {
		this._length = 0;
		this._data = {};
	}

	get length() {
		return this._length;
	}

	get data() {
		return this._data;
	}

	get(index: number): T | undefined {
		return this._data[index];
	}

	push(item: T) {
		this.data[this.length] = item;
		this._length++;
	}

	pop() {
		const lastItem = this._data[this._length - 1];
		delete this._data[this._length - 1];
		this._length--;
		return lastItem;
	}

	shift() {
		const firstItem = this._data[0];

		// re-indexing
		for (let i = 0; i < this._length; i++) {
			this._data[i] = this._data[i + 1];
		}

		delete this._data[this.length - 1];
		this._length--;

		return firstItem;
	}

	deleteByIndex(index: number) {
		const item = this._data[index];

		for (let i = index; i < this._length - 1; i++) {
			this._data[i] = this._data[i + 1];
		}

		// remove the last duplicated reference
		delete this._data[this._length - 1];
		this._length--;

		return item;
	}
}

const myArray = new MyArray<string>();

['apple', 'orange', 'banana', 'dragon fruits'].map((fruit) =>
	myArray.push(fruit),
);

console.log('data ==> ', myArray.data);
console.log('length ==> ', myArray.length);
// console.log('get by index ==> ', myArray.get(1));
// console.log('popped ==> ', myArray.pop());
// console.log('shifted ==> ', myArray.shift());
const deletedByIndex = myArray.deleteByIndex(0);
console.log('deletedByIndex', deletedByIndex);
