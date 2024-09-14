// DFS is typically used to explore nodes and edges of a graph.
// In this example, we'll implement DFS for a tree structure, which can be easily adapted for graphs.

interface TreeNode {
	value: number;
	children: TreeNode[];
}

const root: TreeNode = {
	value: 1,
	children: [
		{
			value: 2,
			children: [
				{ value: 4, children: [] },
				{ value: 5, children: [] },
			],
		},
		{
			value: 3,
			children: [
				{ value: 6, children: [] },
				{ value: 7, children: [] },
			],
		},
	],
};

/** Depth-First Search */
function depthFirstSearch(node: TreeNode) {
	if (!node) return;

	console.log('node.value', node.value);

	for (const child of node.children) {
		depthFirstSearch(child);
	}
}

depthFirstSearch(root);
