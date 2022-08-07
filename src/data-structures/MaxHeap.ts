// max heap/priority queue
export default class MaxHeap {
	data: number[];
	constructor() {
		this.data = [];
	}
	public push(key) {
		// add to end of array and then heapify
		this.data[this.data.length] = key;
		this.heapifyUp();
	}
	public poll(): number | undefined {
		if (this.data.length === 0) return;
		// need to keep max value at i == 0
		const maxValue = this.data[0];
		// replace with last el
		this.data[0] = this.data[this.data.length - 1];
		this.data.pop();
		// then heapify down
		this.heapifyDown();
		// return max value
		return maxValue;
	}
	public peak(): number | undefined {
		if (this.data.length === 0) return;

		return this.data[0];
	}
	/** Used when adding a new el **to the end** */
	private heapifyUp() {
		// until our el is bigger than parent we have to swap them
		let curIdx = this.data.length - 1;
		let parentIdx = this.getParentIndex(curIdx);
		// technically we don't have to have the first condition because the el
		// will be undefined and any operation i.e. > or < of undefined will be
		// false in javascript. However, in other languages not the case and
		// including the first condition improves readability.
		while (curIdx > 0 && this.data[curIdx] > this.data[parentIdx]) {
			this.swap(curIdx, parentIdx);
			curIdx = parentIdx;
			parentIdx = this.getParentIndex(curIdx);
		}

		return;
	}
	/** used to move an unknown el from the **top down**. New el is at first position. */
	private heapifyDown() {
		// until our el is greater or equal to both children (max of children covers), keep swapping down
		let curIdx = 0;
		let leftChildIdx = this.getLeftChildIndex(curIdx);
		let rightChildIdx = this.getRightChildIndex(curIdx);
		let greaterChildIdx = this.getGreaterIndex(leftChildIdx, rightChildIdx);
		// if greaterChildIdx is null, then we are already at the bottom,
		// otherwise we still need to check the greater child idx for swap
		while (
			greaterChildIdx !== null &&
			this.data[curIdx] < this.data[greaterChildIdx]
		) {
			// swap
			this.swap(curIdx, greaterChildIdx);
			// set next iteration
			curIdx = greaterChildIdx;
			leftChildIdx = this.getLeftChildIndex(curIdx);
			rightChildIdx = this.getRightChildIndex(curIdx);
			greaterChildIdx = this.getGreaterIndex(leftChildIdx, rightChildIdx);
		}
		// while condition handles edge cases
		return;
	}
	private getParentIndex(i) {
		return Math.floor((i - 1) / 2);
	}
	private getLeftChildIndex(i) {
		return i * 2 + 1;
	}
	private getRightChildIndex(i) {
		return i * 2 + 2;
	}
	private swap(i1, i2) {
		const temp = this.data[i1];
		this.data[i1] = this.data[i2];
		this.data[i2] = temp;
	}
	/** Gets index whose element has greater value
	 * @returns index containing greater value or null if both indexes are out of
	 * range. If only one index is out of range, returns the other index which
	 * does exist.
	 */
	private getGreaterIndex(i1: number, i2: number): number | null {
		// handle if either is out of range
		const i1IsOut = i1 >= this.data.length;
		const i2IsOut = i2 >= this.data.length;
		if (i1IsOut && i2IsOut) {
			// both out of range return null
			return null;
		}
		// if just one is out of range, return that idx
		if (i1IsOut) {
			return i2;
		}
		if (i2IsOut) {
			return i1;
		}
		// otherise return idx of max value
		if (this.data[i1] >= this.data[i2]) {
			return i1;
		} else {
			return i2;
		}
	}
}

// const heap = new MaxHeap();
// const input = [5, 25, 40, 70, 90, 44];

// for (const el of input) {
// 	heap.push(el);
// 	// console.log(heap.data);
// 	// console.log(isMaxHeap(heap.data,0,heap.data.length))
// }
// console.log(heap.data);

// /** Returns true if arr[i..n-1].
//     represents a max-heap*/
// function isMaxHeap(arr: number[], i: number, n: number) {
// 	// Start from root and go till
// 	// the last internal node
// 	for (let i = 0; i <= Math.floor((n - 2) / 2); i++) {
// 		// If left child is greater,
// 		// return false
// 		if (arr[2 * i + 1] > arr[i]) return false;

// 		// If right child is greater,
// 		// return false
// 		if (2 * i + 2 < n && arr[2 * i + 2] > arr[i]) return false;
// 	}
// 	return true;
// }
