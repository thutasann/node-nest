const fs = require('fs');
const matter = require('gray-matter');
const marked = require('marked');
const path = require('path');
const mkdirp = require('mkdirp');

/**
 * Read and parse a file, converting its content to HTML.
 * @param {string} filename - The name of the file to read.
 * @returns {object} The parsed file content and converted HTML.
 */
const readFile = (filename) => {
	const rawFile = fs.readFileSync(filename, 'utf-8');
	const parsed = matter(rawFile);
	const html = marked.marked(parsed.content);
	return { ...parsed, html };
};

/**
 * Replace placeholders in a template with actual content.
 * @param {string} template - The template string.
 * @param {{ date: string, title: string, content: string }} payload - The content to replace placeholders with.
 * @returns {string} The templated string.
 */
const templatize = (template, { date, title, content }) =>
	template
		.replace(/<!-- PUBLISH_DATE -->/g, date)
		.replace(/<!-- TITLE -->/g, title)
		.replace(/<!-- CONTENT -->/g, content);

/**
 * Save content to a file, creating directories if necessary.
 * @param {string} filename - The name of the file to save.
 * @param {string} contents - The content to save.
 */
const saveFile = (filename, contents) => {
	const dir = path.dirname(filename);
	mkdirp.sync(dir);
	fs.writeFileSync(filename, contents);
};

/**
 * Generate an output filename based on the input filename and output path.
 * @param {string} filename - The input filename.
 * @param {string} outPath - The output directory path.
 * @returns {string} The output filename.
 */
const getOutputFilename = (filename, outPath) => {
	const basename = path.basename(filename, '.md');
	const newFileName = `${basename}.html`;
	return path.join(outPath, newFileName);
};

/**
 * Process a file: read, parse, templatize, and save it.
 * @param {string} filename - The name of the file to process.
 * @param {string} template - The HTML template.
 * @param {string} outPath - The output directory path.
 */
exports.processFile = (filename, template, outPath) => {
	const file = readFile(filename);
	const outfilename = getOutputFilename(filename, outPath);

	const templatized = templatize(template, {
		date: file.data.date,
		title: file.data.title,
		content: file.html,
	});

	saveFile(outfilename, templatized);
	console.log(`📝 ${outfilename}`);
};
