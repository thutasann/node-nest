import { people, products, users } from './utils/slice-data';

/** Slice Method Samples */
class SliceSamples {
	public negativeIndices() {
		const letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f'];
		const latThreeLetters = letters.slice(-3);
		console.log('lastThreeLetters', latThreeLetters);

		const middleLetters = letters.slice(2, -1);
		console.log('middleLetters', middleLetters);
	}

	public shallowCopy() {
		const originalArray: number[] = [1, 2, 3, 4];
		const copyArray = originalArray.slice();

		copyArray[0] = 100;
		console.log('originalArray', originalArray);
		console.log('copyArray', copyArray);
	}

	public slicingArrayObject() {
		const somePeople = people.slice(0, 2);

		somePeople[0].age = 26;
		console.log('somePeople', somePeople);
	}

	public multidimensionalArrays() {
		const matrix: number[][] = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
		];
		const slicedMatrix = matrix.slice(0, 2);
		console.log('slicedMatrix', slicedMatrix);
	}

	public combiningSliceWihMap() {
		const numbers: number[] = [10, 20, 30, 40, 50];

		const doubledSubset = numbers.slice(1, 4).map((num) => num * 2);
		console.log('doubledSubset', doubledSubset);
	}

	public slicingStrings() {
		const text: string = 'Hello, TypeScript';

		const slicedText = text.slice(7);
		console.log('slicedText', slicedText);

		const slicedText2 = text.slice(7, 11);
		console.log('slicedText2', slicedText2);
	}

	public chunkArrayUsage() {
		function chunkArray<T>(arr: T[], size: number): T[][] {
			const chunks: T[][] = [];

			for (let i = 0; i < arr.length; i += size) {
				chunks.push(arr.slice(i, i + size));
			}

			return chunks;
		}

		const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
		const chunks = chunkArray(numbers, 3);
		console.log('chunks', chunks);
	}

	public paginatedData() {
		function getPaginatedProducts(page: number, pageSize: number) {
			const offset = (page - 1) * pageSize;
			return products.slice(offset, offset + pageSize);
		}

		const paginatedProducts = getPaginatedProducts(1, 2);
		console.log('paginatedProducts', paginatedProducts);
	}

	public searchAutoComplete() {
		function searchUsers(query: string, limit: number) {
			const filteredUsers = users.filter((u) => u.username.includes(query));
			return filteredUsers.slice(0, limit);
		}

		const searchResults = searchUsers('a', 2);
		console.log('searchResults', searchResults);
	}

	public trimmingLogFiles() {
		let logs: string[] = [];

		function addLog(log: string) {
			logs.push(log);
			logs = logs.slice(-10);
		}

		for (let i = 0; i < 15; i++) {
			addLog(`Log entry ${i}`);
		}

		console.log('logs', logs);
	}
}

const sliceSamples = new SliceSamples();
sliceSamples.negativeIndices();
sliceSamples.shallowCopy();
sliceSamples.slicingArrayObject();
sliceSamples.multidimensionalArrays();
sliceSamples.combiningSliceWihMap();
sliceSamples.slicingStrings();
sliceSamples.chunkArrayUsage();
sliceSamples.paginatedData();
sliceSamples.searchAutoComplete();
sliceSamples.trimmingLogFiles();
