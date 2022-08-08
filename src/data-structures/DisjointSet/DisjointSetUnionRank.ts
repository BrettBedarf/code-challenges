import DisjointSetQuickUnion from './DisjointSetQuickUnion';

/** Disjoint Set optimization for quick union which attempts to balance the tree
 *on union operations */
class DisjointSetUnionRank extends DisjointSetQuickUnion {
	private rank: number[] = []; // height of each vertex
	constructor(size: number) {
		// creates array of size and every el has itself as root
		super(size);
		// initialize ranks to 1 since each vertex only has itself in tree to
		// start
		for (let i = 0; i < size; i++) {
			this.rank.push(1);
		}
	}
	public union(x: number, y: number) {
		// find root nodes of x and y
		const rootX = this.find(x);
		const rootY = this.find(y);
		// check if x and y have the same root
		// if already connected, do nothing else
		if (rootX === rootY) return;
		// otherwise compare height of 2 nodes
		const rankX = this.rank[x];
		const rankY = this.rank[y];
		// if heightX > heightY, set root of y to root of x
		if (rankX > rankY) {
			this.root[rootY] = rootX;
			return;
		}
		// opposite for heightY > heightX
		else if (rankY > rankX) {
			this.root[rootX] = rootY;
		}
		// else if heights are equal, pick either as new root
		this.root[rootX] = rootY; // doesn't matter which
		// increase new root's height/rank by 1 because adding entire other
		// tree's height
		this.rank[rootY]++;
	}
}

export default DisjointSetUnionRank;
