import MaxHeap from './MaxHeap';

const mockHeapifiedData = [90, 70, 44, 5, 40, 25];
const mockHeapifiedWithZero = [90, 70, 44, 5, 40, 0];

describe('Max Heap', () => {
	let heap;

	beforeEach(() => {
		heap = new MaxHeap();
	});
	test('should add new values', () => {
		const input = [5, 25, 40, 70, 90, 44];
		for (const el of input) {
			heap.push(el);
		}
		for (const el of input) {
			expect(heap.data).toContain(el);
		}
	});
	test('should heapify after adding new values', () => {
		const input = [5, 25, 40, 70, 90, 44];

		for (const el of input) {
			heap.push(el);
			expect(isMaxHeap(heap.data, 0, heap.data.length)).toBeTruthy();
		}
	});
	/** Could incorrectly handle 0's if testing undefined elements as !element.
	 * Test add & heapify */
	test('push method will still add falsey values', () => {
		heap.data = mockHeapifiedData;
		heap.push(0);
		expect(heap.data).toContain(0);
		expect(isMaxHeap(heap.data)).toBeTruthy();
	});
	test('poll method removes and returns the first element', () => {
		heap.data = mockHeapifiedData;
		const firstEl = heap.data[0];
		const startLength = heap.data.length;
		const actual = heap.poll();
		expect(actual).toEqual(firstEl);
		expect(heap.data).not.toContain(firstEl);
		expect(heap.data.length).toEqual(startLength - 1);
	});
	test('poll method heapifies remaining elements', () => {
		heap.data = mockHeapifiedData;
		heap.poll();
		const isHeap = isMaxHeap(heap.data, 0, heap.data.length);
		expect(isHeap).toBeTruthy();
	});
	test('poll method returns undefined if the heap is empty', () => {
		{
			const actual = heap.poll();
			expect(actual).toBeUndefined();
		}
	});
	/** Could return undefined for [0] if using incorrect comparison */
	test('poll method will still return falsey values', () => {
		heap.data = [0];
		const actual = heap.poll();
		expect(actual).toEqual(0);
	});
	test('poll method heapifies when 0 is the last value', () => {
		heap.data = mockHeapifiedWithZero;
		heap.poll();
		expect(isMaxHeap(heap.data)).toBeTruthy();
	});
	test('peak method returns first element', () => {
		// use data we know is already heapified
		heap.data = mockHeapifiedData;
		const actual = heap.peak();
		expect(actual).toEqual(mockHeapifiedData[0]);
	});
	test('peak method returns undefined if there is no data', () => {
		const actual = heap.peak();
		expect(actual).toBeUndefined();
	});
	/** Could return undefined for [0] if using incorrect comparison */
	test('peak method will still return falsey values', () => {
		heap.data = [0];
		const actual = heap.peak();
		expect(actual).toEqual(0);
	});
	test('peak method does not alter the data', () => {
		heap.data = mockHeapifiedData;
		const heapifiedCopy = Array.from(mockHeapifiedData);
		heap.peak();
		expect(heap.data).toEqual(heapifiedCopy);
	});
});

/** Returns true if arr[i..n-1].
    represents a max-heap*/
function isMaxHeap(arr: number[], i: number = 0, n: number = arr.length) {
	// Start from root and go till
	// the last internal node
	for (let i = 0; i <= Math.floor((n - 2) / 2); i++) {
		// If left child is greater,
		// return false
		if (arr[2 * i + 1] > arr[i]) return false;

		// If right child is greater,
		// return false
		if (2 * i + 2 < n && arr[2 * i + 2] > arr[i]) return false;
	}
	return true;
}
