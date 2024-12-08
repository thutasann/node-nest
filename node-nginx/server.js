// @ts-check
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(
	'/images',
	express.static(path.join(__dirname, 'images'), {
		maxAge: '30d',
	}),
);

app.use('/', (req, res) => {
	res.set('Cache-Control', 'public, max-age=3600');
	res.sendFile(path.join(__dirname, 'index.html'));
	console.log('Request served by node app');
});

app.listen(port, () => {
	console.log(`Server is listening on port http://localhost:${port}`);
});
