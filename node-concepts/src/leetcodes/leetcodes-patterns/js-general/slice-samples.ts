interface Student {
	name: string;
	grade: string;
}

interface CartItem {
	name: string;
	price: number;
	quantity: number;
}

interface User {
	id: number;
	name: string;
}

interface UserProfile {
	id: number;
	age: number;
}

const students: Student[] = [
	{ name: 'Alice', grade: 'A' },
	{ name: 'Bob', grade: 'B' },
	{ name: 'Charlie', grade: 'A' },
	{ name: 'David', grade: 'C' },
];

const cart: CartItem[] = [
	{ name: 'Laptop', price: 1000, quantity: 1 },
	{ name: 'Mouse', price: 20, quantity: 2 },
	{ name: 'Keyboard', price: 50, quantity: 1 },
];

const users: User[] = [
	{ id: 1, name: 'John' },
	{ id: 2, name: 'Jane' },
	{ id: 3, name: 'Bob' },
];

const profiles: UserProfile[] = [
	{ id: 1, age: 30 },
	{ id: 2, age: 25 },
];

/** Slice Samples */
class SliceSamples {
	public basicSample() {
		const numbers: number[] = [1, 2, 3, 4, 5];
		const sum = numbers.reduce((acc, curr) => {
			return acc + curr;
		}, 0);
		console.log('sum', sum);
	}

	public arrObjectSample() {
		const items = [
			{ name: 'Book', price: 20 },
			{ name: 'Pen', price: 2 },
			{ name: 'Laptop', price: 1500 },
		];

		const total = items.reduce((acc, curr) => {
			return acc + curr.price;
		}, 0);

		console.log('total', total);
	}

	public occurancesInAnArray() {
		const fruits: string[] = [
			'apple',
			'banana',
			'orange',
			'apple',
			'banana',
			'apple',
		];

		const fruitCount = fruits.reduce(
			(acc, fruit) => {
				acc[fruit] = (acc[fruit] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);

		console.log('fruitCount', fruitCount);
	}

	public groupByGrade() {
		const groupedByGrade = students.reduce(
			(acc, student) => {
				if (!acc[student.grade]) {
					acc[student.grade] = [];
				}
				acc[student.grade].push(student);
				return acc;
			},
			{} as Record<string, Student[]>,
		);
		console.log('groupedByGrade', groupedByGrade);
	}

	public flatternNestedArray() {
		const nestedArray: number[][] = [
			[1, 2],
			[3, 4],
			[5, 6],
		];
		const flatternedArray = nestedArray.reduce((acc, curr) => {
			return acc.concat(curr);
		}, []);
		console.log('flatternedArray', flatternedArray);
	}

	public aggregateData() {
		const totalCoast = cart.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
		console.log('totalCoast', totalCoast);
	}

	public mergeData() {
		const mergedData = users.reduce(
			(acc, user) => {
				const profile = profiles.find((profile) => profile.id === user.id);
				if (profile) {
					acc.push({
						...user,
						age: profile.age,
					});
				}
				return acc;
			},
			[] as Array<{ id: number; name: string; age: number }>,
		);
		console.log('mergedData', mergedData);
	}
}

const sliceSamples = new SliceSamples();
sliceSamples.basicSample();
sliceSamples.arrObjectSample();
sliceSamples.occurancesInAnArray();
sliceSamples.groupByGrade();
sliceSamples.flatternNestedArray();
sliceSamples.aggregateData();
sliceSamples.mergeData();
