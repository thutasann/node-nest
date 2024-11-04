import axios from 'axios';
import pLimit from './p-limit';

const limit = pLimit(5);

/** @internal */
async function fetchTodo(id: number) {
	const { data } = await axios.get(
		`https://jsonplaceholder.typicode.com/todos/${id}`,
	);
	console.log(`Fetched todo with ID: ${id}`, data);
	return data;
}

// Fetch multiple todos with controlled concurrency
async function fetchTodosWithLimit() {
	const todoIds = Array.from({ length: 200 }, (_, i) => i + 1);

	// Run the fetch operation for each todo ID with concurrency control
	const results = await Promise.all(
		todoIds.map((id) => limit(() => fetchTodo(id))),
	);

	console.log('All todos fetched with concurrency limit:', results);
}

fetchTodosWithLimit().catch(console.error);
