import pLimit from './p-limit';

const limit = pLimit(3);

/**
 * Mock function to simulate an API request for user data
 * @internal
 */
const fetchUserData = async (userId: number): Promise<string> => {
	console.log(`Fetching data for user ${userId}...`);
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve(`Data for user ${userId}`);
			console.log(`Fetched data for user ${userId}`);
		}, 1000),
	);
};

const userIds = Array.from({ length: 10 }, (_, i) => i + 1);

const run = async () => {
	const results = await Promise.all(
		userIds.map((userId) => limit(() => fetchUserData(userId))),
	);
	console.log('All user data fetched:', results);
};

run().catch(console.error);
