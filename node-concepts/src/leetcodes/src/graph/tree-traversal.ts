class TreeNodeT {
	value: number;
	left: TreeNodeT | null = null;
	right: TreeNodeT | null = null;

	constructor(value: number) {
		this.value = value;
	}
}

/** In-Order Traversal
 * @description
 * In in-order traversal, the nodes are recursively visited in this order: left subtree, root node, right subtree.
 */
function inOrderTraversal(
	node: TreeNodeT | null,
	visit: (value: number) => void,
) {
	if (node) {
		inOrderTraversal(node.left, visit);
		visit(node.value);
		inOrderTraversal(node.right, visit);
	}
}

/**
 * Pre-Order Traversal
 * @description
 * In pre-order traversal, the nodes are recursively visited in this order: root node, left subtree, right subtree.
 */
function preOrderTraversal(
	node: TreeNodeT | null,
	visit: (value: number) => void,
): void {
	if (node) {
		visit(node.value);
		preOrderTraversal(node.left, visit);
		preOrderTraversal(node.right, visit);
	}
}

/**
 * Post-Order Traversal
 * @description
 * In post-order traversal, the nodes are recursively visited in this order: left subtree, right subtree, root node.
 */
function postOrderTraversal(
	node: TreeNodeT | null,
	visit: (value: number) => void,
): void {
	if (node) {
		postOrderTraversal(node.left, visit);
		postOrderTraversal(node.right, visit);
		visit(node.value);
	}
}

// Usage example
const rootT = new TreeNodeT(1);
rootT.left = new TreeNodeT(2);
rootT.right = new TreeNodeT(3);
rootT.left.left = new TreeNodeT(4);
rootT.left.left.left = new TreeNodeT(6);
rootT.left.right = new TreeNodeT(5);

console.log('In-Order Traversal:');
inOrderTraversal(rootT, (value) => console.log(value));

console.log('Pre-Order Traversal:');
preOrderTraversal(rootT, (value) => console.log(value));

console.log('Post-Order Traversal:');
postOrderTraversal(rootT, (value) => console.log(value));
