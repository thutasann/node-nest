function mergeTwoObjs<T, U>(obj1: T, obj2: U): T & U {
	const merged = { ...obj1, ...obj2 };
	return merged;
}

const merge_user = { name: 'Alice' };
const merge_details = { age: 30 };

const merged_result = mergeTwoObjs(merge_user, merge_details);
