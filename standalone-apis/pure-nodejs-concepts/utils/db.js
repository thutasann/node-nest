// @ts-check

/** Close DB Connection Simulator */
async function closeDBConnection() {
	setTimeout(() => {
		console.log('Databaes Connection cloesd');
		process.exit(0);
	}, 700);
}

module.exports = { closeDBConnection };
