type AdjacencyList = {
	[node in 'A' | 'B' | 'C' | 'D' | 'E' | 'F']: string[];
};

/** Example Adjacency List */
const graph: AdjacencyList = {
	A: ['B', 'C'],
	B: ['A', 'D', 'E'],
	C: ['A', 'F'],
	D: ['B'],
	E: ['B', 'F'],
	F: ['C', 'E'],
};

/** Add Edge */
function addEdge(graph: AdjacencyList, node1: string, node2: string) {
	if (!graph[node1]) graph[node1] = [];

	if (!graph[node2]) graph[node2] = [];

	graph[node1].push(node2);
	graph[node2].push(node1);
}

addEdge(graph, 'G', 'H');

console.log('graph -> ', graph);
