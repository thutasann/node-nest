// @ts-check
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

/** expres main app */
const app = express();
const server = http.createServer(app);
// @ts-ignore - socket.io instance
const io = socketIO(server);

// middlewares
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// socket gateway
io.on('connection', function (socket) {
	console.log('socket connected..');

	socket.on('send:location', (payload) => {
		console.log('payload', payload);
		io.emit('receive:location', {
			id: socket.id,
			...payload,
		});
	});

	socket.on('disconnect', () => {
		io.emit('user:disconnect', socket.id);
	});
});

// routes
app.get('/', (req, res) => {
	res.render(path.join(__dirname, 'views', 'index.ejs'));
});

// bootstrap
server.listen(8080, () => {
	console.log('app is running at http://localhost:8080');
});
