const { readFile } = require('fs');

// ---------------- playground file ----------------

// Promise.resolve().then(() => console.log('this is promice.resolve 1'));
// process.nextTick(() => console.log('this is process.nextTick 1'));

// setTimeout(() => console.log('this is settimeout 1'), 0);
// setTimeout(() => {
// 	console.log('this is settimeout 2');
// 	process.nextTick(() =>
// 		console.log('this is the inner next tick inside setTimeout'),
// 	);
// }, 0);
// setTimeout(() => console.log('this is settimeout 3'), 0);

// process.nextTick(() => console.log('this is process.nextTick 1'));
// process.nextTick(() => console.log('this is process.nextTick 2'));

// Promise.resolve().then(() => console.log('Promise resolved 1'));
// Promise.resolve().then(() => console.log('Promise resolved 2'));

readFile(__filename, () => {
	console.log('This is readFile 1');
});

process.nextTick(() => console.log('this is process.nextTick 1'));
Promise.resolve().then(() => console.log('Promise resolved 1'));
setTimeout(() => console.log('this is settimeout 1'), 0);

for (let i = 0; i < 200; i++) {}
