class DisjointSetQuickUnion {
	root: number[] = [];
	constructor(size: number) {
		// initialize with vertices as their own roots
		for (let i = 0; i < size; i++) {
			this.root.push(i);
		}
	}
	/**
	 * finds the root of x
	 * @param  {} x vertex
	 */
	public find(x: number): number {
		// keep traversing from parent to parent until we find root
		// root == vertex is it's own parent
		while (x !== this.root[x]) {
			x = this.root[x];
		}
		return x;
	}
	public union(x: number, y: number) {
		// connect y to rootX
		// we still need to find rootY and check if they are already connected
		// because just connecting y to rootX could lose a parent of y
		// test case: [0,0,1,2] after union(2,1), 3 should still be connected to 1

		// find rootX
		const rootX = this.find(x);
		const rootY = this.find(y);
		// only change if they are not already connected
		if (rootX !== rootY) {
			// set y parent to rootX
			this.root[y] = rootX;
		}
	}
	public connected(x: number, y: number) {
		return this.find(x) === this.find(y);
	}
}

export default DisjointSetQuickUnion;
