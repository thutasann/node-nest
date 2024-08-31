// @ts-check
const express = require('express');
const uploadRoutes = require('./routes/file-upload');
const mongoUploadRoutes = require('./routes/mongo-file-upload');
const connectDB = require('./utils/mongo_db');
const { initGridFS } = require('./utils/gridfs');
require('dotenv').config();

// Connect to mongo database
connectDB().then(() => {
	initGridFS();
});

const app = express();
app.use('/api/v1/file', uploadRoutes);
app.use('/api/v1/file', mongoUploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}/api/v1/file`);
});
