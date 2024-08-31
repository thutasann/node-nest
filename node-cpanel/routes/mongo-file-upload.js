// @ts-check
const express = require('express');
const { uploadMongo } = require('../utils/mongo_db');

const router = express.Router();

router.post('/upload-mongo', uploadMongo.single('image'), (req, res) => {
	if (!req.file) {
		return res
			.status(400)
			.json({ success: false, message: 'No file uploaded' });
	}

	const file = req.file;

	// file should have an _id if the upload was successful
	if (file && file.id) {
		res.status(200).json({
			success: true,
			message: 'Image uploaded successfully',
			fileId: file.id,
		});
	} else {
		res.status(500).json({ success: false, message: 'File upload failed' });
	}
});

module.exports = router;
