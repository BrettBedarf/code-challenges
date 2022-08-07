namespace ListListCycle {
	//  Definition for singly-linked list.
	class ListNode {
		val: number;
		next: ListNode | null;
		constructor(val?: number, next?: ListNode | null) {
			this.val = val === undefined ? 0 : val;
			this.next = next === undefined ? null : next;
		}
	}

	function hasCycle(head: ListNode | null): boolean {
		if (!head) return false;

		let fast = head;
		let slow = head;

		while (true) {
			for (let i = 0; i < 3; i = i + 2) {
				if (!fast.next) return false;
				if (fast.next === slow) return true;
				fast = fast.next;
			}
			slow = slow.next;
		}
	}

	const list = makeList([3, 2, 0, -4], 1);

	console.log(hasCycle(list));

	function makeList(vals: number[], pos: number) {
		const head = new ListNode(vals[0]);
		// let cycleNode = vals[pos] && new ListNode(vals[pos]);
		let cycleNode = null;
		let curNode = head;
		for (let i = 1; i < vals.length; i++) {
			const newNode = new ListNode(vals[i]);
			if (i === pos) {
				cycleNode = newNode;
			}
			curNode.next = newNode;
			curNode = newNode;
			if (i === vals.length - 1) {
				curNode.next = cycleNode ?? null;
			}
		}

		return head;
	}
}
