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
	// use map with each node as source
	const graph = new Map();
	// we need to keep track if we have visited an edge before so use a set
	const seen = new Set();
	// add vertices to graph
	for (let i = 0; i < edges.length; i++) {
		// we need to add both nodes in the edge since last node in a path could
		// be freestanding
		// if node doesn't exist yet, add it and array with connecting node as
		// val.
		const firstNode = edges[i][0];
		const secondNode = edges[i][1];
		if (!graph.has(firstNode)) {
			graph.set(firstNode, [secondNode]);
		} else {
			// if it does already exist just append new edge to val array
			graph.get(firstNode);
			graph.get(firstNode).push(secondNode);
		}
		if (!graph.has(secondNode)) {
			graph.set(secondNode, [firstNode]);
		} else {
			graph.get(secondNode).push(firstNode);
		}
	}

	// dfs function is used to recursively check each path
	const dfs = vertex => {
		// if we found the destination we are done
		if (vertex === destination) return true;
		// only process if we haven't already visited it
		if (seen.has(vertex)) return false;
		// add to seen set as we visit each vertex
		seen.add(vertex);
		// get neighbors of vertex
		const neighbs = graph.get(vertex);
		// we can loop through those neighbors checking if any have a
		// path to the destination
		for (let i = 0; i < neighbs.length; i++) {
			// we can recurse to check if this
			// neighbor has a path to destination
			if (dfs(neighbs[i])) {
				// we only need one path to exist for answer to be true
				return true;
			}
		}
		// we haven't found it
		return false;
	};

	// start at the source
	return dfs(source);
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
