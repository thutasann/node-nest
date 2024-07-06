/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-types
function sealed(constructor: Function) {
	Object.seal(constructor);
	Object.seal(constructor.prototype);
}

function logParameter(
	target: any,
	propertyKey: string,
	parameterIndex: number,
) {
	const metadataKey = `__log_${propertyKey}_parameters`;

	if (Array.isArray(target[parameterIndex])) {
		target[metadataKey].push(parameterIndex);
	} else {
		target[metadataKey] = [parameterIndex];
	}
}

@sealed
class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}

	greet(@logParameter punctuation: string) {
		console.log('greeting', this.greeting, punctuation);
		return `Hello, ${this.greeting}`;
	}
}

const greet = new Greeter('hello');
greet.greet('hey hey hey');
