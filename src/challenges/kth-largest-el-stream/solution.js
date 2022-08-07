/**
 * @param  {number} val
 * @returns {TreeNode}
 */
function TreeNode(val) {
	/** @type {number } */
	this.val = val;
	/** @type {TreeNode | null} */
	this.left = null;
	/** @type {TreeNode | null} */
	this.right = right = null;
	/** @type {number} */
	this.count = 1;
}

class BinarySearchTree {
	/**
	 * @type {TreeNode | null} root
	 */
	root = null;
	/**
	 * @param  {TreeNode} newNode
	 */
	insert(newNode) {
		if (!this.root) {
			this.root = newNode;
			return;
		}
		// keep going down tree until we find leaf node on correct side and insert
		let cur = this.root;
		while (cur) {
			// increment the count of every node we visit
			// no matter what there will be one more node in it's
			// subtree after operation
			cur.count++;
			// insert into first empty child, we always want to insert as leaf
			if (newNode.val > cur.val) {
				//go right
				if (!cur.right) {
					cur.right = newNode;
					return;
				}
				// keep going right until we can insert as leaf
				cur = cur.right;
			}
			// we will store less than or equal because we don't know the inputs
			// will be unique and we are wanting kth largest including dups
			else {
				if (!cur.left) {
					cur.left = newNode;
					return;
				}
				// keep going left until we can insert as leaf
				cur = cur.left;
			}
		}
	}
}

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function (k, nums) {
	this.k = k;
	this.bst = new BinarySearchTree();
	// add all nums to bst
	for (let i = 0; i < nums.length; i++) {
		this.bst.insert(new TreeNode(nums[i]));
	}

	return null; // we shouldn't have to worry about this from problem constraints
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
	// insert then find kth largest
	this.bst.insert(new TreeNode(val));
	//
	// traverse bst and use children counts to figure out which side kth largest
	// will be
	let curK = this.k;
	let cur = this.bst.root;
	while (cur) {
		// if right has k-1 nodes then cur must be kth largest
		const rightCount = cur?.right?.count ?? 0; // empty right node has 0 total
		// we found it if there are exactly k -1 nodes right because current node
		// has to be the next highest
		if (rightCount === curK - 1) {
			return cur.val;
		}
		// otherwise deduce if kth largest is left or right
		if (rightCount < curK) {
			// there are less nodes right than kth so go left
			cur = cur.left;
			// new k is k - rightCount - 1
			curK = curK - rightCount - 1;
			continue;
		}
		if (rightCount >= curK) {
			// there are more nodes right
			// we keep k the same
			cur = cur.right;
			continue;
		}
	}
};
