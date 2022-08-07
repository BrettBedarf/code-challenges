import { MaxPriorityQueue } from '@datastructures-js/priority-queue'; // leetcode includes lib

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function (nums, k) {
	let count = new Map();
	for (let i = 0; i < nums.length; i++) {
		let curCount = count.get(nums[i]);
		if (curCount !== undefined) {
			count.set(nums[i], ++curCount);
		} else {
			count.set(nums[i], 1);
		}
	}

	// put in max priority q with max as count
	let mpq = new MaxPriorityQueue({
		priority: count => {
			return count[1];
		},
	});

	for (const c of count) {
		mpq.enqueue(c);
	}

	const mostFrequent = [];
	// pop k els
	for (let i = 0; i < k; i++) {
		// number is the 0th idx
		mostFrequent.push(mpq.dequeue().element[0]);
	}

	return mostFrequent;
};

// console.log(topKFrequent([3,5,5,5,2,6,8,],2))
