/** Disjoint set implementation using quick find.
 * Also called UnionFind
 * Find operation is O(1) with the tradeoff that
 * union takes (ON)
 * */

class DisjointSetQuickFind {
	root: number[];
	/**
	 * @param  {number} size number of vertices
	 */
	constructor(size: number) {
		// initialize root to have the size of # of vertices & fill their own i
		// makes all elements as their own root
		this.root = new Array(size);
		for (let i = 0; i < this.root.length; i++) {
			// the root node of each vertex is itself
			this.root[i] = i;
		}
	}
	/**
	 * @param  {number} x vertex index to find
	 * @return corresponding root vertex
	 */
	public find(x: number) {
		// every index points to it's root
		return this.root[x];
	}
	/**
	 * Merges two vertices
	 * @param  {} x
	 * @param  {} y
	 */
	public union(x: number, y: number) {
		// first we need the root nodes of two vertices
		const rootX = this.find(x);
		const rootY = this.find(y);
		// when the roots are equal we know they are already connected
		// so we don't have to perform the union operation
		if (rootX !== rootY) {
			// Any current nodes with the same root as y (rootY) now need
			// to have the same root as x (rootX). This way we can ensure
			// each el in the root array will be the correct root node
			for (let i = 0; i < this.root.length; i++) {
				if (this.root[i] === rootY) {
					this.root[i] = rootX;
				}
			}
		}
	}
	/**
	 * @description determines if x and y are connected
	 * @param  {number} x
	 * @param  {number} y
	 */
	public connected(x: number, y: number) {
		return this.find(x) === this.find(y);
	}
}

export default DisjointSetQuickFind;
