const apiMock = new Proxy(
	{},
	{
		get(target, prop) {
			if (prop === 'fetchData') {
				return () => Promise.resolve({ data: 'mocked data' });
			}
			return () => Promise.reject(new Error('not implemented'));
		},
	},
);
apiMock.fetchData().then((response) => console.log(response.data));
