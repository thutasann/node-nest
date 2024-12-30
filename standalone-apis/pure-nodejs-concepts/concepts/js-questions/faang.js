function log(message) {
	console.log(`\n===> ${message}`);
}

function q_one() {
	log('question one');
	// console.log(018 - 015);
	console.log(0o17);
	console.log(typeof typeof 1);
}

function sort_output() {
	log('sort output');
	const numbers = [33, 2, 8];
	numbers.sort();
	console.log('numbers', numbers[1]);
}

function loose_euql() {
	log('loose equal');
	console.log(false == '0');
	console.log({} == '[object Object]');
	console.log(0.1 + 0.2 == 0.3);
}

q_one();
sort_output();
loose_euql();
