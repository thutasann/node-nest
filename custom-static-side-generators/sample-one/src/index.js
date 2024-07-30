const fs = require('fs');
const path = require('path');
const glob = require('glob');
const express = require('express');
const { processFile } = require('./utils');

/**
 * Main function to process all markdown files in the source directory.
 */
const main = () => {
	const srcPath = path.resolve('src');
	const outPath = path.resolve('dist');
	const template = fs.readFileSync(path.join(srcPath, 'template.html'), 'utf8');
	const filenames = glob.sync(path.join(srcPath, 'pages/**/*.md'));

	filenames.forEach((filename) => {
		processFile(filename, template, outPath);
	});
};

main();

const app = express();
const PORT = 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html at the root
app.get('/', (req, res) => {
	const file_name = path.join(__dirname, '..', 'dist', 'index.html');
	res.sendFile(file_name);
});

app.get('/page2', (req, res) => {
	const file_name = path.join(__dirname, '..', 'dist', 'page2.html');
	res.sendFile(file_name);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
