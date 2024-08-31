// @ts-check
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const multer = require('multer');

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

const storage = multer.memoryStorage();
const uploadMongo = multer({ storage });

module.exports = {
	initGridFS,
	getGFS,
	uploadMongo,
};
