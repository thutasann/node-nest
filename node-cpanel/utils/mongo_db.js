// @ts-check
const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/asia_reviewer_db';

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {});
		console.log('MongoDB connected');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
