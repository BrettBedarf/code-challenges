/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
	// pointer for each
	// keep track of which s we are looking for while iterating t
	// move s over when we find it

	// if s is empty string return true
	if (s.length === 0) return true;

	let sIdx = 0;
	for (let i = 0; i < t.length; i++) {
		// if we find the current s, move over
		if (s[sIdx] === t[i]) {
			sIdx++;
			// if we've already found all s, it is a subsequence
			if (sIdx > s.length - 1) {
				return true;
			}
		}
	}

	// we didn't find all s chars
	return false;
};
