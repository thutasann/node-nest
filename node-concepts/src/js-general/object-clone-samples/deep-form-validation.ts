/** Example Form Value */
const formValue = {
	personalInfo: {
		name: 'Naruto',
		age: 17,
	},
	address: {
		city: 'Konoha',
		zip: '12345',
	},
	preferences: {
		newsletter: true,
		notifications: false,
	},
};

/** type alias for form value */
type FormValueProps = typeof formValue;

/** deep clone form data */
function deepCloneValue<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}

/** validation function */
function validateForm(data: FormValueProps) {
	const errors: Record<string, string> = {};

	if (!data.personalInfo.name) {
		errors.name = 'Name is required';
	}

	if (typeof data.personalInfo.age !== 'number' || data.personalInfo.age < 18) {
		errors.age = 'You must be at least 18 years old';
	}

	if (!data.address.city) {
		errors.city = 'City is required';
	}

	if (!/^\d{5}$/.test(data.address.zip)) {
		errors.zip = 'ZIP code must be a 5-digit number';
	}

	return errors;
}

/** Deep clone the form data to preserve the original */
const clonedFormData = deepCloneValue(formValue);

// Modify the cloned data for validation (e.g., trimming input, normalizing values)
clonedFormData.personalInfo.name = clonedFormData.personalInfo.name.trim();
clonedFormData.address.zip = clonedFormData.address.zip.trim();
clonedFormData.personalInfo.age = 18;

/** Validate the clonsed form data */
const validationErrors = validateForm(clonedFormData);

// Output validation results
if (Object.keys(validationErrors).length > 0) {
	console.log('Form validation failed:', validationErrors);
} else {
	console.log('Form is valid. Proceeding with submission...');
}

console.log('-------------------------');

// Check that original data remains unchanged
console.log('Original form data --> ', formValue);
console.log('Cloned form data --> ', clonedFormData);
