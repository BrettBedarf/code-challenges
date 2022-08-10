/*
 * @lc app=leetcode id=547 lang=javascript
 *
 * [547] Number of Provinces
 */

// @lc code=start
/**
 * @param {number[][]} isConnected
 * @return {number}
 */
function findCircleNum(isConnected) {
	// trying to figure out the total # of groups
	// we could use a disjoint set and union all connecting cities
	const root = [];
	const rank = [];

	for (let i = 0; i < isConnected.length; i++) {
		//all nodes are isolated roots with height of 1 to start
		root.push(i);
		rank.push(1);
	}
	// connect cities
	for (let i = 0; i < isConnected.length; i++) {
		const city = isConnected[i];
		for (let j = 0; j < city.length; j++) {
			const connection = city[j]; // true/false
			// if connected merge cities
			connection && union(i, j);
		}
	}

	// then count unique roots
	// have to do find for every element since some could be nested under ancestors
	const roots = root.map(x => find(x));
	let provinces = new Set(roots);

	return provinces.size;

	/** finds the root of x */
	function find(x) {
		// use recursive path compression
		// base case: x is root
		if (x === root[x]) return x;
		// else set root to root of parent
		const found = find(root[x]);
		return found;
	}
	function union(x, y) {
		// use union by rank
		// get both roots
		const rootX = find(x);
		const rootY = find(y);
		// if they already have the same root we are done
		if (rootX === rootY) return;
		// else if heightX > heightY, connect y ROOT to rootX
		const heightX = rank[rootX];
		const heightY = rank[rootY];
		if (heightX > heightY) {
			root[rootY] = rootX;
			return;
		}
		// else if heightY > heightX, connect x to rootY
		else if (heightY > heightX) {
			root[rootX] = rootY;
			return;
		}
		// else if they are the same height, connect either and add +1 rank/height
		// to the common root
		root[rootX] = rootY;
		rank[rootY]++;
	}
}
// @lc code=end

// @after-stub-for-debug-begin
module.exports = findCircleNum;
// @after-stub-for-debug-end
