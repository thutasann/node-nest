function reverseString(str: string) {
	return str.split('').reverse().join('');
}

const result = reverseString('Hello');
console.log('result', result);

function reverseStringRecursive(str: string) {
	if (str.length <= 1) return str;
	return reverseString(str.slice(1)) + str[0];
}

const recursive_result = reverseString('Hello');
console.log('recursive_result', recursive_result);
