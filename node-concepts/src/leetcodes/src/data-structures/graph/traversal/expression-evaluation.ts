/**
 *  Expression Evaluation in Compilers
 * - Problem: Evaluating mathematical expressions where operators are nodes, and operands are child nodes.
 * - Solution: Post-order traversal is used to evaluate expressions in compilers, as it processes operands before operators.
 */
class ExprNode {
	value: string;
	left: ExprNode | null = null;
	right: ExprNode | null = null;

	constructor(value: string) {
		this.value = value;
	}
}

/** Evaluate Expression */
function evaluateExpression(node: ExprNode): number {
	if (!node.left && !node.right) {
		return parseInt(node.value);
	}

	const leftVal = evaluateExpression(node.left);
	const rightVal = evaluateExpression(node.right);

	switch (node.value) {
		case '+':
			return leftVal + rightVal;
		case '-':
			return leftVal - rightVal;
		case '*':
			return leftVal * rightVal;
		case '/':
			return leftVal / rightVal;
		default:
			throw new Error('Unknown operator');
	}
}

const rootExpr = new ExprNode('+');
rootExpr.left = new ExprNode('3');
rootExpr.right = new ExprNode('*');
rootExpr.right.left = new ExprNode('2');
rootExpr.right.right = new ExprNode('4');

console.log(evaluateExpression(rootExpr)); // 3 + (2 * 4) = 11
