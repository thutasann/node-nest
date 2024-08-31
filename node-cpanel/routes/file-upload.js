const express = require('express');
const { upload } = require('../utils/storage');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('<h1>Hello From Nodejs cpanel</h1>');
});

router.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		console.log('req', req.file);

		if (err) {
			return res.status(500).send(err);
		}
		res.status(200).json({
			success: true,
			message: 'File uploaded successfully',
			filePath: req.file.path,
		});
	});
});

module.exports = router;
