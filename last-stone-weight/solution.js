import { MaxPriorityQueue } from '@datastructures-js/priority-queue'; // leetcode includes lib

/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
	// use heap to pop 2, push remainder, repeat

	const maxQ = new MaxPriorityQueue();
	// load nums into heap
	for (let i = 0; i < stones.length; i++) {
		maxQ.enqueue(stones[i]);
	}

	// only process if at least 2 stones
	while (maxQ.size() > 1) {
		const max = maxQ.dequeue().element;
		const next = maxQ.dequeue().element;
		const diff = max - next;
		if (!diff) {
			// both stones are destroyed do nothing
		} else {
			maxQ.enqueue(diff);
		}
	}

	if (maxQ.size() === 1) return maxQ.front().element;
	else return 0;
};
