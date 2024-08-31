// @ts-check
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const path = require('path');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/asia_reviewer_db';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI, {});

// Initialize gfs
let gfs;

conn.once('open', () => {
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('uploads');
});

// Create storage engine
const storageMongo = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(16, (err, buf) => {
				if (err) {
					return reject(err);
				}
				const filename = buf.toString('hex') + path.extname(file.originalname);
				const fileInfo = {
					filename: filename,
					bucketName: 'uploads', // Should match the collection name
				};
				resolve(fileInfo);
			});
		});
	},
});

const uploadMongo = multer({ storage: storageMongo });

module.exports = {
	uploadMongo,
	storageMongo,
};
