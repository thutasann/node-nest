export abstract class ValidParentheses {
	public static SolutionOne(word: string): boolean {
		const stack: string[] = [];
		const parens = '() [] {}';
		let i: number = 0;

		while (i < word.length) {
			stack.push(word[i]);
			i++;

			const open = stack[stack.length - 2];
			const closed = stack[stack.length - 1];
			const potParens = open + closed;

			if (parens.includes(potParens)) {
				stack.pop();
				stack.pop();
			}
		}

		return stack.length === 0;
	}

	public static usageOne() {
		const word = '()';
		const result = this.SolutionOne(word);
		console.log('ValidParentheses : >>', result);
	}
}
