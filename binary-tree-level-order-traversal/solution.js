/*
 * @lc app=leetcode id=102 lang=javascript
 *
 * [102] Binary Tree Level Order Traversal
 */

const { Queue } = require('@datastructures-js/queue');
/** @typedef {import("../data-structures/TreeNode").default} TreeNode*/
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
 * @return {number[][]}
 */
const levelOrder = root => {
	// use q in the same order
	if (!root) return [];

	const out = [];
	const q = new Queue();
	q.enqueue(root);

	let lvlIdx = 0; // used to track which idx in out we are on
	while (q.size() > 0) {
		// add this level to output
		out[lvlIdx] = [];
		// and next level to q
		// make sure not to check size in the for loop because it will try to run
		// with newly q'd
		const lvlSize = q.size();
		for (let i = 0; i < lvlSize; i++) {
			const cur = q.dequeue();

			out[lvlIdx].push(cur.val);
			// we have already set iteration length
			// so we can safely add children to q for next level
			// only add if child exists
			cur.left && q.enqueue(cur.left);
			cur.right && q.enqueue(cur.right);
		}
		lvlIdx++;
	}

	return out;
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = levelOrder;
// @after-stub-for-debug-end
