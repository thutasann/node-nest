// @ts-check
const avro = require('avsc');

const eventType = avro.Type.forSchema({
	type: 'record',
	name: 'Pet',
	fields: [
		{
			name: 'kind',
			type: { type: 'enum', name: 'PetKind', symbols: ['CAT', 'DOG'] },
		},
		{ name: 'name', type: 'string' },
	],
});

module.exports = eventType;
