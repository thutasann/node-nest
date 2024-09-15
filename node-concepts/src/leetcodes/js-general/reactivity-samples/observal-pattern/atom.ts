export const createAtom = (data) => {
	const store = { data };
	const watchers = [];

	const watch = (watcher) => {
		watchers.push(watcher);

		const cleanup = () => {
			const index = watchers.indexOf(watcher);
			watchers.splice(index, 1);
		};

		return cleanup;
	};

	const update = (newData) => {
		const previousValue = store.data;
		const newValue = newData(previousValue);

		store.data = newValue;

		watchers.forEach((notify) => notify(newValue, previousValue));
	};

	return [store.data, { update, watch }];
};
