const multer = require('multer');
const fs = require('fs');
const ftp = require('basic-ftp');
const SFTPClient = require('ssh2-sftp-client');

// Function to upload the file to cPanel server (Option 1)
const uploadToCpanel = async (localFilePath, remoteFileName) => {
	const client = new ftp.Client();
	client.ftp.verbose = true;

	try {
		await client.access({
			host: process.env.HOST, // cPanel server address
			user: process.env.USER_NAME, // cPanel username
			password: process.env.PASSWORD, // cPanel password
			secure: true, // Enable FTPS
		});

		await client.uploadFrom(
			localFilePath,
			`public_html/uploads/${remoteFileName}`,
		);
	} catch (err) {
		throw new Error(`Failed to upload file: ${err.message}`);
	} finally {
		client.close();
		// Optionally, remove the temporary file after upload
		fs.unlinkSync(localFilePath);
	}
};

// (Option 2)
const uploadToCpanelTwo = async (localFilePath, remoteFileName) => {
	const sftp = new SFTPClient();

	try {
		await sftp.connect({
			port: 22, // Default SFTP port
			host: process.env.HOST, // cPanel server address
			user: process.env.USER_NAME, // cPanel username
			password: process.env.PASSWORD, // cPanel password
		});

		await sftp.put(localFilePath, `/public_html/uploads/${remoteFileName}`);
	} catch (err) {
		throw new Error(`Failed to upload file: ${err.message}`);
	} finally {
		sftp.end();
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
	uploadToCpanelTwo,
	uploadCpanel,
};
