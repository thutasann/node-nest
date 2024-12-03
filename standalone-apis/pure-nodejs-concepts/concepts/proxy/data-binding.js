function createReactiveObject(target, onChange) {
	return new Proxy(target, {
		set(target, prop, value) {
			const result = Reflect.set(target, prop, value);
			onChange(prop, value);
			return result;
		},
	});
}

const state = createReactiveObject({ count: 0 }, (prop, value) => {
	console.log(`Property ${prop} changed to ${value}`);
});

state.count = 1;
state.count = 2;
