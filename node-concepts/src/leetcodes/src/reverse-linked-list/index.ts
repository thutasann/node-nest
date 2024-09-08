import { Logger } from '@nestjs/common';

/**
 * Singly Linked List
 */
class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val?: number, next?: ListNode | null) {
		this.val = val || 0;
		this.next = next || null;
	}
}

/** Reverse Linked List
 * - T: O(n)
 * - S: O(1)
 */
export abstract class ReverseLinkedList {
	static logger = new Logger(ReverseLinkedList.name);

	/** Reverse Linked List */
	public static solutionOne(head: ListNode | null): ListNode | null {
		let currentNode = head;
		let previousNode = null;

		while (currentNode) {
			const nextNode = currentNode.next;

			currentNode.next = previousNode;
			previousNode = currentNode;

			if (!nextNode) return currentNode;

			currentNode = nextNode;
		}

		return currentNode;
	}

	/** Reverse Linked List Usage Sample */
	public static usageOne() {
		this.logger.debug('Reverse Linked List Usage One ');
		const node3 = new ListNode(3);
		const node2 = new ListNode(2, node3);
		const head = new ListNode(1, node2);

		function printList(head: ListNode | null): void {
			let currentNode = head;
			const results: number[] = [];

			while (currentNode) {
				results.push(currentNode.val);
				currentNode = currentNode.next;
			}

			console.log(results.join(' -> ') + ' -> null');
		}

		console.log('Original Linked List:');
		printList(head);

		const reversedHead = ReverseLinkedList.solutionOne(head);
		console.log('Reversed Linked List:');
		printList(reversedHead);
	}
}
