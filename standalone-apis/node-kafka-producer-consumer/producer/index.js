// @ts-check
const Kafka = require('node-rdkafka');
const eventType = require('../event-type');

const stream = Kafka.Producer.createWriteStream(
	{
		'metadata.broker.list': 'localhost:9092',
	},
	{},
	{ topic: 'test' },
);

/** Queue message */
function queueMessage() {
	const buf = eventType.toBuffer({ kind: 'CAT', name: 'Albert' });
	const success = stream.write(buf);
	if (success) {
		console.log('message wrote successfully to stream. ✅');
	} else {
		console.log('something went wrong..');
	}
}

setInterval(() => {
	queueMessage();
}, 3000);
