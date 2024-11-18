const axios = require('axios');
const fs = require('fs');
const path = require('path');

const uploadImage = async () => {
	try {
		const imagePath = path.resolve(__dirname, 'your-image.jpg');
		const imageData = fs.createReadStream(imagePath);

		const response = await axios.post(
			'https://cpanel.asiareviewer.com/upload',
			imageData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		console.log('Image uploaded successfully:', response.data);
	} catch (error) {
		console.error('Error uploading image:', error.message);
	}
};

uploadImage();
