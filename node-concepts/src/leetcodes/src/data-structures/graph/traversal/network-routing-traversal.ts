/**
 *  Network Routing Algorithms
 * - Problem: Finding the shortest path or all possible paths in a network, where each node represents a router or switch, and edges represent connections.
 * - Solution: Pre-order or post-order traversal can be used to explore paths in network routing algorithms.
 */
class NetworkNode {
	id: string;
	connections: NetworkNode[] = [];

	constructor(id: string) {
		this.id = id;
	}
}

/** Find path */
function findPath(
	start: NetworkNode,
	end: NetworkNode,
	visited: Set<string> = new Set(),
): boolean {
	if (start === end) return true;

	visited.add(start.id);

	for (const neighbor of start.connections) {
		if (!visited.has(neighbor.id)) {
			if (findPath(neighbor, end, visited)) {
				return true;
			}
		}
	}

	return false;
}

// Usage
const a = new NetworkNode('A');
const b = new NetworkNode('B');
const c = new NetworkNode('C');
const d = new NetworkNode('D');

a.connections.push(b, c);
b.connections.push(d);
c.connections.push(d);

console.log(findPath(a, d));
