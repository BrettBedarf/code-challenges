import TreeNode from '../data-structures/TreeNode';
import { BinarySearchTree } from '../data-structures/BinarySearchTree';

/* 

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: 
“The lowest common ancestor is defined between two nodes p and q as the lowest 
node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST. 
*/

function lowestCommonAncestor(
	root: TreeNode | null,
	p: TreeNode | null,
	q: TreeNode | null
): TreeNode | null {
	if (!root || !p || !q) return null;

	// any time one is left and the other right, current node is LCA
	let bigger = Math.max(p.val, q.val);
	let smaller = Math.min(p.val, q.val);
	// because p and q are unique, this also covers if node1 is parent of node2:
	// i.e. bigger === root.val &&   smaller === root?.left?.val
	if (bigger >= root.val && smaller <= root.val) {
		return root;
	}

	// otherwise they are both on the same side so recurse
	if (bigger < root.val) {
		return lowestCommonAncestor(root.left, p, q);
	}
	if (smaller > root.val) {
		return lowestCommonAncestor(root.right, p, q);
	}

	return null;
}

console.log(testCaseHelper([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8));
console.log(testCaseHelper([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4));
console.log(testCaseHelper([2, 1], 2, 1));
console.log(testCaseHelper([null], null, null));

/** heler for leetcode test case format */
function testCaseHelper(
	nums: (number | null)[],
	p: number | null,
	q: number | null
) {
	const root = BinarySearchTree.fromArray(nums).root;
	let pTree: TreeNode | null = null;
	let qTree: TreeNode | null = null;

	for (let i = 0; i < nums.length; i++) {
		if (pTree && qTree) break;

		if (p !== null && nums[i] === p) {
			pTree = BinarySearchTree.fromArray(nums.slice(i)).root;
			continue;
		}
		if (q !== null && nums[i] === q) {
			qTree = BinarySearchTree.fromArray(nums.slice(i)).root;
		}
	}

	return lowestCommonAncestor(root, pTree, qTree)?.val;
}
