for (let i = 0; i < 5; i++) {
	if (i === 3) continue;
	console.log('i', i);
}

console.log('----------------------------\n');

let i = 0;
while (i < 5) {
	i++;
	if (i === 3) {
		continue;
	}
	console.log('i', i);
}

console.log('----------------------------\n');

for (let i = 0; i < 3; i++) {
	for (let j = 0; j < 3; j++) {
		if (j === 1) {
			continue;
		}
		console.log(`i = ${i}, j = ${j}`);
	}
}
