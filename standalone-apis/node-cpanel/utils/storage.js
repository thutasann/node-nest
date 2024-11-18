// @ts-check
const multer = require('multer');
const path = require('path');
const fs = require('fs');

/** Ensure the uploads directory exists */
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

/**  Set up disk storage engine */
const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadDir = 'uploads/';
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

/** Use memory storage to store the file in RAM */
const storage = multer.memoryStorage();

/**  Initialize the upload middleware */
const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5MB
}).single('image'); // 'image' is the key expected in the form-data

const uploadDisk = multer({ storage: diskStorage });

module.exports = {
	diskStorage,
	storage,
	upload,
	uploadDisk,
};
