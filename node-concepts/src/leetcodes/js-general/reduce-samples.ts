import {
	actions,
	cart,
	CartItemTwo,
	categories,
	Category,
	DataBatch,
	dataBatches,
	fruits,
	items,
	nestedArray,
	products,
	profiles,
	Student,
	students,
	subCategories,
	SubCategory,
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

	public flatternDeeplyNestedArray() {
		const deeplyNestedArray = [[[1, 2]], [[3, 4]]];

		const flatternArray = (arr: any[]) => {
			return arr.reduce((acc, val) => {
				return acc.concat(Array.isArray(val) ? flatternArray(val) : val);
			}, []);
		};

		const deepFlat = flatternArray(deeplyNestedArray);
		console.log('deepFlat', deepFlat);
	}

	public stateManagementSample() {
		const cartAction = actions.reduce((state: CartItemTwo[], action) => {
			switch (action.type) {
				case 'ADD_ITEM':
					return [
						...state,
						{
							id: action.payload.id,
							name: action.payload.name,
							price: action.payload.price,
						},
					];
				case 'REMOVE_ITEM':
					return state.filter((item) => item.id !== action.payload.id);
				case 'UPDATE_ITEM':
					return state.map((item) =>
						item.id === action.payload.id
							? { ...item, price: action.payload.price }
							: item,
					);
				default:
					return state;
			}
		}, []);
		console.log('cartAction', cartAction);
	}

	public memorize<T extends (...args: any[]) => any>(fn: T) {
		const cache = {} as Record<string, ReturnType<T>>;
		return (...args: Parameters<T>) => {
			const key = JSON.stringify(args);
			if (cache[key]) {
				return cache[key];
			}
			const result = fn(...args);
			cache[key] = result;
			return result;
		};
	}

	public memorizeUsage() {
		const factorial = (n: number): number =>
			n <= 1 ? 1 : n * factorial(n - 1);

		const memorizedFactorial = this.memorize(factorial);
		console.log('memorizedFactorial(5)', memorizedFactorial(5));
		console.log('memorizedFactorial(5)', memorizedFactorial(5));
	}

	public processBatchData() {
		const processBatch = (data: DataBatch) => {
			return {
				...data,
				processed: data.data.map((num) => num * 2),
			};
		};

		const processedBatchData = dataBatches.reduce((acc, batch) => {
			acc.push(processBatch(batch));
			return acc;
		}, [] as DataBatch[]);

		console.log('processedBatchData', processedBatchData);
	}

	public assignSubCategoriesToCategories(
		categories: Category[],
		subCategories: SubCategory[],
	) {
		const categoriesWithSubCategories = categories.reduce(
			(acc: Category[], category) => {
				const relatedSubCategories = subCategories.filter(
					(sub) => sub.categoryId === category.id,
				);

				acc.push({
					...category,
					subCategories: relatedSubCategories,
				});

				return acc;
			},
			[],
		);
		console.log('categoriesWithSubCategories', categoriesWithSubCategories);
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
reduceSamples.flatternDeeplyNestedArray();
reduceSamples.stateManagementSample();
reduceSamples.memorizeUsage();
reduceSamples.processBatchData();
reduceSamples.assignSubCategoriesToCategories(categories, subCategories);
