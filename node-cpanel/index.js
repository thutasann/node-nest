// @ts-check
const express = require('express');
const uploadRoutes = require('./routes/file-upload');

const app = express();
app.use('/api/v1/file', uploadRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}/api/v1/file`);
});
