const mysql = require('mysql2');

// Create connection to the database
const db = mysql.createConnection({
	host: 'localhost',
	user: 'your-username',
	password: 'your-password',
	database: 'your-database',
});

db.connect((err) => {
	if (err) throw err;
	console.log('Connected to database');
});

module.exports = { db };
