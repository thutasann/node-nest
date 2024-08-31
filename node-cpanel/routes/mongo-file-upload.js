// @ts-check
const express = require('express');
const { Readable } = require('stream');
const { uploadMongo, getGFS } = require('../utils/gridfs');

const router = express.Router();

router.post('/upload-mongo', uploadMongo.single('image'), (req, res) => {
	try {
		const gfs = getGFS(); // Ensure GridFS is initialized

		if (!req.file) {
			return res.status(400).send('No file uploaded.');
		}

		const file = req.file;
		const writestream = gfs.createWriteStream({
			filename: file.originalname,
			contentType: file.mimetype,
		});

		const stream = Readable.from(file.buffer);
		stream.pipe(writestream);

		writestream.on('close', (file) => {
			res.status(200).json({
				file: file,
				message: 'File uploaded successfully!',
			});
		});

		writestream.on('error', (err) => {
			res.status(500).send(`Error uploading file: ${err.message}`);
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
});

module.exports = router;
