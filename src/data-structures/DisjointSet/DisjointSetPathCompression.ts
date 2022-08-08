import DisjointSetUnionRank from './DisjointSetUnionRank';

class DisjointSetPathCompression extends DisjointSetUnionRank {
	constructor(size: number) {
		super(size);
	}
	public find(x: number) {
		const parent = this.root[x]; //just for readability
		// recursively check if x is root
		if (x === parent) {
			// if so, return x/root
			return x;
		}
		// if it's not, return `find(parent)`
		return this.find(parent);
	}
}

export default DisjointSetPathCompression;
