/**
 * Deep Clone: Handling Complex Form Data or Payloads
 * - When handling large and complex nested objects (such as form data) in a frontend application,
 * - a deep clone ensures that no references to the original object are maintained
 * - This is useful when you need to manipulate data before sending it
 * - (e.g., form validation, adding new fields) without altering the original object.
 * @description
 * -  When working with data that might be reused or reset (like forms),
 * - deep cloning prevents accidental modifications to the original object, making it safe to manipulate a copy and send it to an API.
 */
const formData = {
	personalInfo: {
		name: 'Naruto',
		age: 17,
	},
	address: {
		city: 'Konoha',
		zip: '12345',
	},
};

// Deep clone to modify the copy without affecting original form data
const clonedData = JSON.parse(JSON.stringify(formData));

// Modify the cloned data before sending it to and API
clonedData.address.city = 'Suna';

// Original formData remains untouched, useful for resetting or editing later
console.log('formData (original) -> ', formData);
