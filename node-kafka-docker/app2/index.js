// @ts-check
const express = require('express');
const app = express();
const kafka = require('kafka-node');
const mongoose = require('mongoose');

// middlewares
app.use(express.json());

// middlewares
app.use(express.json());

// db
const dbConnect = async () => {
	mongoose.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/app2');

	const User = new mongoose.Schema({
		name: String,
		email: String,
		password: String,
	});

	const userModel = mongoose.model('user', User);

	// kafka client
	const client = new kafka.KafkaClient({
		kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
	});
	const consumer = new kafka.Consumer(
		client,
		[{ topic: process.env.KAFKA_TOPIC || 'topic1' }],
		{
			autoCommit: false,
		},
	);

	consumer.on('message', async (message) => {
		// @ts-ignore
		return await userModel.create(JSON.parse(message.value));
	});
};

dbConnect();
app.listen(process.env.PORT || 6000);
