// @ts-check
const express = require('express');
const { Readable } = require('stream');
const { uploadMongo, getGFS, diskUpload } = require('../utils/gridfs');
const Image = require('../schema/image-schem');

const router = express.Router();

router.post('/disk-upload', diskUpload.single('image'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(500).json({ error: 'No file found' });
		}
		const imageFile = Image({
			filename: req.file.filename,
			filepath: req.file.path,
		});

		const savedImage = await imageFile.save();

		res.status(200).json(savedImage);
	} catch (error) {
		console.log(error);
	}
});

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
