abstract class DisjointSetBase {
	root: number[] = [];
	protected abstract find(x: number): void;
	protected abstract union(x: number, y: number): void;
	constructor(size: number) {
		// initialize with vertices as their own roots
		for (let i = 0; i < size; i++) {
			this.root.push(i);
		}
	}

	public connected(x: number, y: number) {
		return this.find(x) === this.find(y);
	}
}

export default DisjointSetBase;
