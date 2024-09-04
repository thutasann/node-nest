/** Graph Data Structure */
class Graph<T> {
	private adjacencyList: Map<T, T[]>;

	constructor() {
		this.adjacencyList = new Map();
	}

	/** Get List */
	getList() {
		return this.adjacencyList;
	}

	/** add vertex */
	addVertex(vertex: T): void {
		if (!this.adjacencyList.has(vertex)) {
			this.adjacencyList.set(vertex, []);
		}
	}

	/** add edge */
	addEdge(vertex1: T, vertex2: T): void {
		if (!this.adjacencyList.has(vertex1)) {
			this.addVertex(vertex1);
		}
		if (!this.adjacencyList.has(vertex2)) {
			this.addVertex(vertex2);
		}

		this.adjacencyList.get(vertex1).push(vertex2);
		this.adjacencyList.get(vertex2).push(vertex1);
	}

	/** remove vertex */
	removeVertex(vertex: T): void {
		this.adjacencyList.forEach((_, key) => {
			this.removeEdge(vertex, key);
		});
		this.adjacencyList.delete(vertex);
	}

	/** remove edge */
	removeEdge(vertex1: T, vertex2: T): void {
		this.adjacencyList.set(
			vertex1,
			this.adjacencyList.get(vertex1).filter((v) => v !== vertex2),
		);
		this.adjacencyList.set(
			vertex2,
			this.adjacencyList.get(vertex2).filter((v) => v !== vertex1),
		);
	}

	/** breadth-first search(bfs) */
	bfs(start: T): T[] {
		const visited = new Set<T>();
		const queue: T[] = [start];
		const result: T[] = [];

		while (queue.length > 0) {
			const vertex = queue.shift();
			if (!visited.has(vertex)) {
				visited.add(vertex);
				result.push(vertex);

				this.adjacencyList.get(vertex).forEach((neighbor) => {
					if (!visited.has(neighbor)) {
						queue.push(neighbor);
					}
				});
			}
		}

		return result;
	}

	/** depth-first search  (dfs) */
	dfs(start: T): T[] {
		const visited = new Set<T>();
		const result: T[] = [];

		/** dfs helper */
		const dfsHelper = (vertex: T): void => {
			if (!vertex) return;

			visited.add(vertex);
			result.push(vertex);

			this.adjacencyList.get(vertex).forEach((neighbor) => {
				if (!visited.has(neighbor)) {
					dfsHelper(neighbor);
				}
			});
		};

		dfsHelper(start);

		return result;
	}
}

const graphSample = new Graph<string>();

graphSample.addVertex('A');
graphSample.addVertex('B');
graphSample.addVertex('C');
graphSample.addVertex('D');
graphSample.addVertex('E');

graphSample.addEdge('A', 'B');
graphSample.addEdge('A', 'C');
graphSample.addEdge('B', 'D');
graphSample.addEdge('C', 'E');

const list = graphSample.getList();
console.log('list', list);

console.log('BFS: ', graphSample.bfs('A'));
console.log('DFS:', graphSample.dfs('A'));
