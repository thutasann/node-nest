const multer = require('multer');
const fs = require('fs');
const ftp = require('basic-ftp');
const SFTPClient = require('ssh2-sftp-client');

/** Function to upload the file to cPanel server */
const uploadToCpanel = async (localFilePath, remotePath) => {
	const client = new ftp.Client();
	client.ftp.verbose = false;

	try {
		if (!fs.existsSync(localFilePath)) {
			throw new Error('Local file does not exist.');
		}

		await client.access({
			host: process.env.HOST, // cPanel server address
			user: process.env.USER_NAME, // cPanel username
			password: process.env.PASSWORD, // cPanel password
			secure: true, // Enable FTPS
			secureOptions: {
				rejectUnauthorized: false, // Optional: bypass certificate validation
			},
		});

		await client.uploadFrom(localFilePath, remotePath);
	} catch (err) {
		throw new Error(`Failed to upload file: ${err.message}`);
	} finally {
		client.close();
		// Optionally, remove the temporary file after upload
		fs.unlinkSync(localFilePath);
	}
};

// Set up multer for file storage and naming
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads'); // Directory where files will be saved
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname); // Preserve the original file name
	},
});

const uploadCpanel = multer({ storage: storage });

module.exports = {
	uploadToCpanel,
	uploadCpanel,
};
