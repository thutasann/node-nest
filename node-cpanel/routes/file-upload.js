const express = require('express');
const { upload } = require('../utils/storage');
const Client = require('ssh2-sftp-client');
const { uploadToCpanel, uploadCpanel } = require('../utils/c-panel');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('<h1>Hello From Nodejs cpanel</h1>');
});

router.post(
	'/cpanel-upload',
	uploadCpanel.single('image'),
	async (req, res) => {
		if (!req.file) {
			return res.status(400).send('No image was uploaded.');
		}

		let uploadedImagePath = req.file.path;

		try {
			await uploadToCpanel(uploadedImagePath, req.file.originalname);

			res.send('Image uploaded and saved to cPanel server successfully!');
		} catch (uploadErr) {
			res.status(500).send(uploadErr.message);
		}
	},
);

router.post('/upload', (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			return res.status(500).send(err);
		}
		console.log('uploaded file:', req.file);

		const sftp = new Client();

		try {
			await sftp.connect({
				host: process.env.HOST,
				port: '22',
				username: process.env.USER_NAME,
				password: process.env.PASSWORD,
				readyTimeout: 20000,
			});

			const remotePath = `/public_html/wp-content/uploads/${path.basename(
				req.file.path,
			)}`;

			await sftp.put(req.file.path, remotePath);

			console.log('File uploaded to cPanel via SFTP');

			// Optionally delete the file from the local directory after upload
			fs.unlink(req.file.path, (err) => {
				if (err) console.log('Local file deletion error:', err.message);
			});

			res.status(200).json({
				success: true,
				message: 'File uploaded to cPanel successfully',
				filePath: remotePath,
			});
		} catch (error) {
			console.log('SFTP Error:', error.message);
			res.status(500).json({ success: false, message: 'SFTP upload failed' });
		} finally {
			sftp.end();
		}
	});
});

module.exports = router;
