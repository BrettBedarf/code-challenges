namespace ListListCycleII {
	//  Definition for singly-linked list.
	class ListNode {
		val: number;
		next: ListNode | null;
		constructor(val?: number, next?: ListNode | null) {
			this.val = val === undefined ? 0 : val;
			this.next = next === undefined ? null : next;
		}
	}
	function detectCycle(head: ListNode | null): ListNode | null {
		const visited = new Set();

		let curNode = head;

		while (curNode) {
			if (visited.has(curNode)) return curNode;
			visited.add(curNode);
			curNode = curNode.next;
		}
		return null;
	}

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
	const vals = [
		-21, 10, 17, 8, 4, 26, 5, 35, 33, -7, -16, 27, -12, 6, 29, -12, 5, 9,
		20, 14, 14, 2, 13, -24, 21, 23, -21, 5,
	];
	vals[24];
	const list = makeList(vals, 24);
	console.log(detectCycle(list));
}
