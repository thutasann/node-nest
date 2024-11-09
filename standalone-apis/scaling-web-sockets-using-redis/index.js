// @ts-check
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = 4000;

/** express app */
const app = express();

/** http server */
const server = createServer(app);

/** instance of socket server */
const io = new Server(server, {
	cors: {
		credentials: true,
		origin: ['http://localhost:3000'],
	},
	maxHttpBufferSize: 1e8,
});

io.on('connection', (socket) => {
	console.log('A new client connected');

	socket.on('disconnect', () => {
		console.log('Client disconnecteds');
	});
});

app.get('/', (req, res) => {
	res.send('<h1>Scaling Web Sockets using Redis Pub/Sub</h1>');
});

server.listen(PORT, () => {
	console.log(`Server is listening on port : http://localhost:${PORT}`);
});
