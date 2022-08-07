function sym(...args) {
	const symDiffMap = args.reduce((countsMap, next) => {
		// Add any elements in both to reducers
		// Put next array into a set and check for matching elements
		// against the accumulator

		// Add each to map with counts and the intersection
		// will be any with count === 1

		// Use map over obj so keys can be numbers instead of just strings.

		// Make sure all values in both are unique otherwise
		// multiple in one arr would cause count above 1 even
		// if not in second.
		const nextSet = new Set(next);

		for (const el of nextSet) {
			// default counts[el] to 0 before trying to add 1
			countsMap.set(el, (countsMap.get(el) ?? 0) + 1);
		}

		// Remove any elements we saw more than once.
		countsMap.forEach((count, el) => {
			if (count > 1) {
				countsMap.delete(el); // maps have fast deletes
			}
		});

		// Now counts map only contains the sym diff
		return countsMap;
	}, new Map());

	return [...symDiffMap.keys()];
}

console.log(sym([1, 2, 3], [5, 2, 1, 4]));
