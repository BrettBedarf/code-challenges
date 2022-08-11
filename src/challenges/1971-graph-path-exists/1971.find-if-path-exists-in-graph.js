/*
 * @lc app=leetcode id=1971 lang=javascript
 *
 * [1971] Find if Path Exists in Graph
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
	// edge case: source and destination the same is always true
	if (source === destination) return true;
	// we need an adjacency list so we know the edges each vertex has
	// we could use map but in this problem know that nodes are 0 to n -1
	const graph = [];
	// init each node with empty arr
	for (let i = 0; i < n; i++) {
		graph[i] = [];
	}
	// we need to keep track if we have visited an edge before so use a set
	const seen = new Set();
	const stack = [];
	// add vertices to graph
	for (let i = 0; i < edges.length; i++) {
		// we need to add both nodes in the edge since last node in a path could
		// be freestanding
		graph[edges[i][0]].push(edges[i][1]);
		graph[edges[i][1]].push(edges[i][0]);
	}

	// use while loop and stack in place of recursion to check each path
	stack.push(source);
	while (stack.length > 0) {
		const vertex = stack.pop();
		// if we found the destination we are done
		if (vertex === destination) return true;
		// only process if we haven't already visited it
		if (seen.has(vertex)) continue;
		// add to seen set as we visit each vertex
		seen.add(vertex);
		// get neighbors of vertex
		const neighbs = graph[vertex];
		// we can loop through those neighbors checking if any have a
		// path to the destination
		for (let i = 0; i < neighbs.length; i++) {
			// we can recurse to check if this
			// neighbor has a path to destination
			stack.push(neighbs[i]);
		}
	}

	// we haven't found it
	return false;
};
// @lc code=end

validPath(
	10,
	[
		[4, 3],
		[1, 4],
		[4, 8],
		[1, 7],
		[6, 4],
		[4, 2],
		[7, 4],
		[4, 0],
		[0, 9],
		[5, 4],
	],
	5,
	9
);

// validPath(
// 	3,
// 	[
// 		[0, 1],
// 		[1, 2],
// 		[2, 0],
// 	],
// 	0,
// 	2
// );
