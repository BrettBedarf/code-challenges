import DisjointSetQF from './DisjointSetQuickFind';
import DisjointSetQU from './DisJointSetQuickUnion';

describe('Disjoint Set Quick Find', MakeDJTest(DisjointSetQF));
describe('Disjoint Set Quick Union', MakeDJTest(DisjointSetQU));

/** Allows reusing tests for different implementations */
function MakeDJTest(DisjointSet) {
	return () => {
		test('should create disjoint set', () => {
			const ds = new DisjointSet(5);
			expect(ds).toBeDefined();
		});
		test('should create a root array with the size of the number of vertices', () => {
			const ds = new DisjointSet(5);
			expect(ds.root.length).toBe(5);
		});
		test('should find root node', () => {
			const ds = new DisjointSet(5);
			expect(ds.find(0)).toBe(0);
			expect(ds.find(1)).toBe(1);
			expect(ds.find(2)).toBe(2);
			expect(ds.find(3)).toBe(3);
			expect(ds.find(4)).toBe(4);
		});
		test('should union two vertices', () => {
			const ds = new DisjointSet(5);
			ds.union(0, 1); // [0,0,2,3,4]
			ds.union(2, 3); // [0,0,2,2,4]
			ds.union(3, 4); // [0,0,2,2,2]
			expect(ds.connected(0, 1)).toBe(true);
			expect(ds.connected(2, 3)).toBe(true);
			expect(ds.connected(3, 4)).toBe(true);
			expect(ds.connected(0, 2)).toBe(false);
			expect(ds.connected(0, 3)).toBe(false);
			expect(ds.connected(0, 4)).toBe(false);
		});
		test('union of vertices already in same group should not change root', () => {
			const ds = new DisjointSet(5);
			ds.union(0, 1); // [0,0,2,3,4]
			ds.union(2, 3); // [0,0,2,2,4]
			ds.union(3, 4); // [0,0,2,2,2]
			const before = ds.root;
			// 5 is already in 4's group
			ds.union(5, 4); // [0,0,2,2,2]
			const after = ds.root;

			expect(before).toEqual(after);
		});
		test('union of vertices already connected through ancestor should stay connected to ancestor', () => {
			const ds = new DisjointSet(5);
			ds.root = [0, 0, 1, 2]; // 3 is already connected to root 0 through 2 -> 1 ancestors

			ds.union(3, 0);
			expect(ds.connected(3, 1)).toBeTruthy();
		});
	};
}
