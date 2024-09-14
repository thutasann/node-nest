console.log(1 / 0); // Infinity

console.log(Infinity + 1); // Output: Infinity
console.log(Infinity - 100); // Output: Infinity
console.log(Infinity * 2); // Output: Infinity
console.log(Infinity / Infinity); // Output: NaN
console.log(Infinity > 1000000); // Output: true
console.log(-1 / 0);

console.log('----------------------------\n');

console.log(isFinite(Infinity)); // false
console.log(isFinite(1000)); // true
console.log(isFinite(-Infinity)); // false

console.log('----------------------------\n');

console.log(Number.MAX_VALUE); // Output: 1.7976931348623157e+308
console.log(Infinity > Number.MAX_VALUE); // Output: true

console.log('----------------------------\n');

let count = 0;
while (count < Infinity) {
	console.log('count', count);
	if (count === 100) break;
	count++;
}
