export interface DisjointSet {
	root: number[];
	find(x: number): void;
	union(x: number, y: number): void;
	connected(x: number, y: number): boolean;
}

abstract class DisjointSetBase implements DisjointSet {
	root: number[] = [];
	abstract find(x: number): void;
	abstract union(x: number, y: number): void;
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
