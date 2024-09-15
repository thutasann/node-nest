class ProxySamples {
	public sampleOne() {
		const originalData = { hello: 'Friend', other: 'Other' };

		const data = new Proxy(originalData, {
			get: (target, keyName) => {
				if (keyName === 'hello') return 'World';

				return target[keyName];
			},
		});

		console.log('data', data);
		console.log('data.hello', data.hello);
	}
}

const proxySamples = new ProxySamples();
proxySamples.sampleOne();
