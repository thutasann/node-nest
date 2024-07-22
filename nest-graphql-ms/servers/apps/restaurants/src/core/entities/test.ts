function takeOrders(orders: string[]) {
	for (const order of orders) {
		console.log(`🤷‍♂️ Waiter sends ${order} to cook\n`);
		cookOrder(order).then(deliverOrder);
	}
}

function cookOrder(order: string) {
	return new Promise((resolve, reject) => {
		console.log(`🥘 Cooking ${order}\n`);
		setTimeout(() => {
			console.log(`✅ Done coooking ${order}\n`);
			console.log('resolve', resolve);
			resolve(order);
		}, 1000);
	});
}

function deliverOrder(order: string) {
	console.log(`🚀 Deliver ${order} to customer\n`);
}

takeOrders(['Food 1', 'Food 2', 'Food 3']);
