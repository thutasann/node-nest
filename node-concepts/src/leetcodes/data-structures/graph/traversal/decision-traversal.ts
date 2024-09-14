/**
 * Decision Trees in AI and Machine Learning
 * - Problem: Evaluating decisions in a decision tree, where each node represents a decision point, and each leaf node represents an outcome.
 * - Solution: Post-order traversal is often used to evaluate the results of a decision tree, as you may need to evaluate all child nodes before deciding on the parent node.
 */
class DecisionNode {
	question: string;
	yes: DecisionNode | null = null;
	no: DecisionNode | null = null;

	constructor(question: string) {
		this.question = question;
	}
}

/** Evaluate Decision Tree */
function evaluateDecisionTree(node: DecisionNode): string {
	if (!node.yes && !node.no) {
		return node.question; // Leaf node
	}

	/** assume yes or no based on some condition */
	const condition = Math.random() > 0.5;
	return condition
		? evaluateDecisionTree(node.yes)
		: evaluateDecisionTree(node.no);
}

/** Usage */
const rootQuestion = new DecisionNode('Is it raining ?');
rootQuestion.yes = new DecisionNode('Take an umbrella');
rootQuestion.no = new DecisionNode("You don't need an umbrella");

console.log('Result : ', evaluateDecisionTree(rootQuestion));
