// @ts-check
const express = require('express');
const uploadRoutes = require('./routes/file-upload');
const mongoUploadRoutes = require('./routes/mongo-file-upload');
const { connectDB } = require('./utils/mongo_db');
const { initGridFS } = require('./utils/gridfs');
const path = require('path');
require('dotenv').config();

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Connect to mongo database
connectDB().then(() => {
	initGridFS();
});

const app = express();
app.use('/api/v1/file', uploadRoutes);
app.use('/api/v1/file', mongoUploadRoutes);

// Middleware to serve static files from the uploads directory
app.use('/uploads', express.static(UPLOADS_DIR));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}/api/v1/file`);
});
