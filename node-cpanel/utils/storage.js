// @ts-check
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/** Ensure the uploads directory exists */
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

/**  Set up storage engine */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir); // Specify the directory where the file should be saved
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname),
		);
	},
});

// Initialize the upload middleware
const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5MB
}).single('image'); // 'image' is the key expected in the form-data

module.exports = {
	storage,
	upload,
};
