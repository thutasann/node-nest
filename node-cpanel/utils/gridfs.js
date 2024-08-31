// @ts-check
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const { mongoURI } = require('./mongo_db');
const path = require('path');

let gfs;

const initGridFS = () => {
	if (mongoose.connection.readyState === 1) {
		gfs = Grid(mongoose.connection.db, mongoose.mongo);
		gfs.collection('uploads');
	} else {
		throw new Error('Mongoose connection is not open');
	}
};

const getGFS = () => {
	if (!gfs) {
		throw new Error('GridFS is not initialized');
	}
	return gfs;
};

const storage = new GridFsStorage({
	url: mongoURI,
	file: (req, file) => {
		return {
			bucketName: 'uploads', // Set the collection name
			filename: `${Date.now()}${path.extname(file.originalname)}`, // Set the filename
		};
	},
});

const diskStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + file.originalname);
	},
});

const uploadMongo = multer({ storage });
const diskUpload = multer({ storage: diskStorage });

module.exports = {
	initGridFS,
	getGFS,
	uploadMongo,
	diskUpload,
};
