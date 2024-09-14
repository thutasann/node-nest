import {
	cart,
	fruits,
	items,
	nestedArray,
	products,
	profiles,
	Student,
	students,
	users,
} from './reduce-data';

/** Reduce Samples */
class ReduceSamples {
	public basicSample() {
		const numbers: number[] = [1, 2, 3, 4, 5];
		const sum = numbers.reduce((acc, curr) => {
			return acc + curr;
		}, 0);
		console.log('sum', sum);
	}

	public arrObjectSample() {
		const total = items.reduce((acc, curr) => {
			return acc + curr.price;
		}, 0);

		console.log('total', total);
	}

	public occurancesInAnArray() {
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

	public summingNestedObject() {
		const totalPriceByCategory = products.reduce(
			(acc, product) => {
				acc[product.category] = product.items.reduce(
					(sum, item) => sum + item.price,
					0,
				);
				return acc;
			},
			{} as Record<string, number>,
		);
		console.log('totalPriceByCategory', totalPriceByCategory);
	}

	public chainingReduceWithOtherMethods() {
		const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

		const sumOfEvenNumbers = numbers
			.filter((num) => num % 2 === 0)
			.reduce((acc, curr) => acc + curr, 0);
		console.log('sumOfEvenNumbers', sumOfEvenNumbers);
	}
}

const reduceSamples = new ReduceSamples();
reduceSamples.basicSample();
reduceSamples.arrObjectSample();
reduceSamples.occurancesInAnArray();
reduceSamples.groupByGrade();
reduceSamples.flatternNestedArray();
reduceSamples.aggregateData();
reduceSamples.mergeData();
reduceSamples.summingNestedObject();
reduceSamples.chainingReduceWithOtherMethods();
