/*
 * @lc app=leetcode id=278 lang=javascript
 *
 * [278] First Bad Version
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
	/**
	 * @param {integer} n Total versions
	 * @return {integer} The first bad version
	 */
	return function (n) {
		// binary tree with condition isBadVersion()
		// we want to find the number who is bad but it's left is good
		// edge case: if bad version is 1, then there will be nothing to the left

		// track left, right idx for virtual arr as we iterate with while loop
		let leftVersion = 1;
		let rightVersion = n;

		while (leftVersion <= rightVersion) {
			const midVersion = Math.floor(
				(rightVersion - leftVersion) / 2 + leftVersion
			);
			// target will be bad and it's left will be good (or out of range for
			// if midIdx == 0 )
			// version in range will be midIdx + 1
			if (isBadVersion(midVersion)) {
				if (midVersion === 1 || !isBadVersion(midVersion - 1)) {
					return midVersion;
				}
				// else the first bad version is left
				rightVersion = midVersion - 1;
			} else {
				// bad version must be higher
				leftVersion = midVersion + 1;
			}
		}
	};
};
// @lc code=end

// @after-stub-for-debug-begin
module.exports = solution;
// @after-stub-for-debug-end
