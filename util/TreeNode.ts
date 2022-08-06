/** Binary Tree Node */
export default class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	public constructor(val: number) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}
