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

/** Reverse Linked List */
export abstract class ReverseLinkedList {
	/** Reverse Linked List */
	public static solutionOne(head: ListNode | null) {}
}
