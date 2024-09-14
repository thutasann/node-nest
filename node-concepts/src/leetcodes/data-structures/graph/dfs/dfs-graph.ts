interface GraphNode {
	value: number;
	neighbors: GraphNode[];
}

const node1: GraphNode = { value: 1, neighbors: [] };
const node2: GraphNode = { value: 2, neighbors: [] };
const node3: GraphNode = { value: 3, neighbors: [] };

node1.neighbors.push(node2, node3);
node2.neighbors.push(node1);
node3.neighbors.push(node1);

/** Adapting DFS for Graphs: */
function depthFirstSearchGraph(
	node: GraphNode,
	visited: Set<GraphNode> = new Set(),
) {
	if (!node || visited.has(node)) return;

	console.log('value => ', node.value);
	visited.add(node);

	for (const neighbor of node.neighbors) {
		depthFirstSearchGraph(neighbor, visited);
	}
}

depthFirstSearchGraph(node2);
