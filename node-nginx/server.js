// @ts-check
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const port = 3000;
const replicaApp = process.env.APP_NAME;

app.use(
	'/images',
	express.static(path.join(__dirname, 'images'), {
		maxAge: '30d',
	}),
);

app.use('/', (req, res) => {
	res.set('Cache-Control', 'public, max-age=3600');
	res.sendFile(path.join(__dirname, 'index.html'));
	console.log(`Request served by ${replicaApp}`);
});

app.listen(port, () => {
	console.log(`${replicaApp} is listening on port http://localhost:${port}`);
});
