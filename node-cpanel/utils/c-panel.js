const multer = require('multer');
const Client = require('ftp');
const fs = require('fs');

// Function to upload the file to cPanel server
const uploadToCpanel = async (localFilePath, remoteFileName) => {
	const ftpClient = new Client();

	const ftpConfig = {
		host: process.env.HOST, // cPanel server address
		user: process.env.USER_NAME, // cPanel username
		password: process.env.PASSWORD, // cPanel password
	};

	return new Promise((resolve, reject) => {
		ftpClient.on('ready', () => {
			ftpClient.put(
				localFilePath,
				`public_html/uploads/${remoteFileName}`,
				(err) => {
					if (err) return reject(err);

					ftpClient.end();
					resolve();
				},
			);
		});

		ftpClient.connect(ftpConfig);
	});
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
