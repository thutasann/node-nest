export const port = process.env.PORT;
export const env = process.env.NODE_ENV;
export const serviceUrl =
	env === 'DEVELOPMENT'
		? `http://localhost:${port}`
		: 'https://nest-ai-chat.onrender.com/';
