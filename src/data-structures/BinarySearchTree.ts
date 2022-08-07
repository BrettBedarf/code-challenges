import TreeNode from './TreeNode';

export class BinarySearchTree {
	root: TreeNode | null = null;

	public insert(newNode: TreeNode): void {
		// start at root
		// if no root just replace it
		if (!this.root) {
			this.root = newNode;
		}
		// start traversing down tree to figure out where you want to go
		insertHelper(this.root, newNode);

		function insertHelper(root: TreeNode, node: TreeNode): void {
			// if node is greater than root go right
			if (node.val > root.val) {
				// if no right node already exists, insert here
				if (!root.right) {
					root.right = node;
					// we are done so return
					return;
				}
				// else if node already exists, recurse with right as the new root
				insertHelper(root.right, node);
			}
			// if node is less than root insert left
			if (node.val < root.val) {
				// if no left node already exists, insert here
				if (!root.left) {
					root.left = node;
					return;
				}
				// else if node already exists recurse with left as the new root
				insertHelper(root.left, node);
			}
			// if node is equal pick by convention if you want left, right, or do
			// nothing
			// this kind of tree has number data so no point replacing
			return;
		}

		return;
	}
	public find(val: number): TreeNode | null {
		//start at root
		let cur = this.root;
		while (cur) {
			// base case: if node is null it's not in the tree, return null
			if (!cur) {
				return null;
			}
			// if val is less than cur node go left
			if (val < cur.val) {
				cur = cur.left;
				continue;
			}
			// if val is greater than cur node go right
			if (val > cur.val) {
				cur = cur.right;
				continue;
			}
			// if val is equal return node
			if (val === cur.val) {
				return cur;
			}
		}

		return null; // this.root could be null
	}
	public delete(val: number): void {
		// Replace the node we want to remove with its successor (if any) to
		// maintain the BST invariant
		this.root = deleteHelper(val, this.root);

		function deleteHelper(
			val: number,
			root: TreeNode | null
		): TreeNode | null {
			// base case: we are at leaf
			if (!root?.left && !root?.right) return null;

			let cur: TreeNode | null = root;
			let parent: TreeNode | null = null;
			let target: TreeNode | null = null;

			while (cur) {
				if (!cur) break;
				// val is greater -> go right
				if (val > cur.val) {
					const temp: TreeNode = cur;
					parent = cur;
					cur = temp.right;
					continue;
				}
				// val is less -> go left
				if (val < cur.val) {
					const temp = cur;
					parent = cur;
					cur = temp.left;
					continue;
				}
				if (val === cur.val) {
					// we got a winner
					target = cur;
					break;
				}
			}
			if (!target) return null;
			// - case target has both children -> swap with EITHER largest left val OR
			// smallest right    val
			// - case target has only & left child -> swap with max left
			//   we will combine these to if it has a left node, swap with max left  &
			//   delete orig maxLeft
			if (target.left) {
				// go left side -> go right in subtree and find max
				const maxLeft = BinarySearchTree.findMax(target.left);
				// we could also find minRight but only need one way
				// copy maxLeft value to target and delete maxLeft

				// delete maxLeft since it's been raised to target
				// - recurse until hits leaf case
				// - to do iterative we would have to nest everything in
				//   val ===
				//   cur.data case in while loop. Messier so just using recursion for
				//   readability
				target.left = deleteHelper(maxLeft.val, target.left);
				target.val = maxLeft.val;
				return root;
			}
			// case target has only & right child -> swap with minRight and delete
			// orig minRight
			if (target.right) {
				// find min of right subtree
				const minRight = this.findMin(target.right);
				// swap target val with minRight
				// delete minRight
				target.right = deleteHelper(minRight.data, target.right);
				target.val = minRight.data;
				return root;
			}
			// case target has no children -> unlink parent node
			if (!target.left && !target.right) {
				// handle single node, no parent no children
				if (!parent) return null;
				// figure out which side of parent by bigger/smaller
				if (parent.val > target.val) {
					// target is left
					parent.left = null;
				} else {
					// target is right
					parent.right = null;
				}
				return root;
			}
			return null;
		}
	}
	static findMax(root: TreeNode): TreeNode {
		let cur: TreeNode | null = root;

		while (cur) {
			// if no right child remaining we are at max
			if (!cur.right) {
				return cur;
			}
			// otherwise keep going right until we hit a leaf
			cur = cur.right;
		}

		return cur; //just keeps ts compiler happy
	}
	static findMin(root: TreeNode): TreeNode {
		let cur: TreeNode | null = root;

		while (cur) {
			// if no right child remaining we are at max
			if (!cur.left) {
				return cur;
			}
			// otherwise keep going right until we hit a leaf
			cur = cur.left;
		}

		return cur; //just keeps ts compiler happy
	}
	traverseBfs(root: TreeNode | null = this.root): (number | null)[] {
		// bfs for readability
		const out: (number | null)[] = [];
		const q: (TreeNode | null)[] = [root]; //going to be O(N) shifts but not the point of this excecise
		while (q.length > 0) {
			const cur = q.shift();
			if (cur) {
				out.push(cur.val);
				// add in order we want them later shifted from left
				q.push(cur.left);
				q.push(cur.right);
			} else {
				// base case node is null
				out.push(null);
			}
		}
		return out;
	}
	static fromArray(nums: (number | null)[]): BinarySearchTree {
		const bst = new BinarySearchTree();
		for (let i = 0; i < nums.length; i++) {
			const val = nums[i]; // ts compiler being annoying
			if (val !== null) {
				bst.insert(new TreeNode(val));
			}
		}
		return bst;
	}
}

// const bst = new BinarySearchTree();
// // insert
// bst.insert(new TreeNode(7));
// bst.traverseBfs(); //?
// bst.insert(new TreeNode(20));
// bst.traverseBfs(); //?
// bst.insert(new TreeNode(5));
// bst.traverseBfs(); //?
// bst.insert(new TreeNode(5));
// bst.traverseBfs(); //?
// bst.insert(new TreeNode(11));
// bst.traverseBfs(); //?
// bst.insert(new TreeNode(21));
// bst.traverseBfs(); //?
// // find
// bst.find(5); //?
// bst.find(1); //?
// // bst.find(null); //?
// bst.delete(20);
// bst.traverseBfs(); //?
// bst.delete(7);
// bst.traverseBfs(); //?
