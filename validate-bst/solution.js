/*
 * @lc app=leetcode id=98 lang=javascript
 *
 * [98] Validate Binary Search Tree
 */

const { Queue } = require('@datastructures-js/queue');

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
	/* 
   do inorder dfs. result should be sorted array nlogn 
   */
	let prev = null;
	let cur = root;
	const stack = [];

	while (stack.length > 0 || cur) {
		while (cur) {
			// keep going left with cur as far as we can go
			// push every left node we see to the stack so we can process them in reverse
			// order
			stack.push(cur);
			cur = cur.left;
		}
		// last node on stack is farthest left we can go
		cur = stack.pop();
		// process this value
		// because we are processing in order, previous value should always be
		// smaller. Otherwise it is not sorted. This means we can exit early for
		// any falsey condition

		// careful to only compare after we found first val
		if (prev !== null && !(prev < cur.val)) {
			return false;
		}
		prev = cur.val;
		// set cur to right, if it's null then it will never make it onto the
		// stack
		cur = cur.right;
	}

	return true;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = isValidBST;
// @after-stub-for-debug-end
