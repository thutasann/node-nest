const http = require('https');

http.get('https://www.google.com/', (res) => {
	let data = '';

	res.on('data', (chunk) => {
		data += chunk;
	});

	res.on('end', () => {
		console.log('Response: ', data.slice(0, 70));
	});

	res.on('error', (err) => {
		console.log('err :', err);
	});
});

console.log('this will log before the response ---> \n');
