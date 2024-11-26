// @ts-check
const express = require('express');
const app = express();
const kafka = require('kafka-node');
const sequelize = require('sequelize');

// middlewares
app.use(express.json());

// db
const dbConnect = () => {
	const postgres_db_url = 'postgres://postgres:postgres@postgres:5432/postgres';
	const db = new sequelize.Sequelize(
		process.env.POSTGRES_URL || postgres_db_url,
	);
	const User = db.define('user', {
		name: sequelize.STRING,
		email: sequelize.STRING,
		password: sequelize.STRING,
	});

	// kafka client
	const client = new kafka.KafkaClient({
		kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
	});
	const producer = new kafka.Producer(client);
	producer.on('ready', () => {
		console.log('producer ready ✅');
		app.post('/', async (req, res) => {
			producer.send(
				[
					{
						topic: process.env.KAFKA_TOPIC || 'topic1',
						messages: JSON.stringify(req.body),
					},
				],
				async (err, data) => {
					if (err) console.error('producer send error : ', err);
					else {
						console.log('producer send data : ', data);
						await User.create(req.body);
						res.send(req.body);
					}
				},
			);
		});
	});
};

dbConnect();
app.listen(process.env.PORT || 5000);
