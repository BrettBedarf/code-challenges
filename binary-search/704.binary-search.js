/*
 * @lc app=leetcode id=704 lang=javascript
 *
 * [704] Binary Search
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
	// standard binary search
	// iterative with while loop, track left, right, mid pointers
	let leftIdx = 0;
	let rightIdx = nums.length - 1;

	while (leftIdx <= rightIdx) {
		const midIdx = Math.floor((rightIdx - leftIdx) / 2 + leftIdx);
		if (target > nums[midIdx]) {
			//go right -> left + 1, right stays the same
			leftIdx = midIdx + 1;
			continue;
		}
		if (target < nums[midIdx]) {
			// go left -> right - 1, left stays the same
			rightIdx = midIdx - 1;
			continue;
		}
		// otherwise target must be mid val, return idx
		return midIdx;
	}

	// if we don't find return -1
	return -1;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = search;
// @after-stub-for-debug-end
