const localStorage = require('./localStorage');

console.log('LocalStorage length -> ', localStorage.length);

var uid = localStorage.getItem('user_id');

if (!uid) {
	console.log('User ID not found. Setting the user id and token...');
	localStorage.setItem('token', 'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ');
	localStorage.setItem('user_id', '12345');
} else {
	console.log('User ID found.', uid);
	// localStorage.clear();
}
