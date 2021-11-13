//Definition for singly-linked list.
function ListNode(val, next) {
	this.val = val === undefined ? 0 : val;
	this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// var reverseList = function (head) {
// 	if (!head.next) return head;

// 	let newHead;
// 	let oldHead = head;
// 	while (head.next) {
// 		oldHead = newHead ?? head;
// 		newHead = head.next;
// 		head.next = head.next.next;
// 		newHead.next = oldHead;
// 	}

// 	return newHead;
// };

const reverseList = head => {
	prev = null;
	curr = head;
	while (curr != null) {
		nextTemp = curr.next; //?
		curr.next = prev; //?
		prev = curr; //?
		curr = nextTemp; //?
	}
	return prev;
};

const input = [1, 2, 3, 4, 5];

const list = makeList(input);

console.log(reverseList(list));

function makeList(vals) {
	const head = new ListNode(vals[0]);

	let curNode = head;
	for (let i = 1; i < vals.length; i++) {
		const newNode = new ListNode(vals[i]);
		curNode.next = newNode;
		curNode = newNode;
	}

	return head;
}
