function mergeArrays(myArray, alicesArray) {
  // Combine the sorted arrays into one large sorted array

  // Since arrays are already sorted, can compare the heads of each
  // for which is less and should go into the merged array next.

  const mergedArray = [];

  let myIndex = 0;
  let aliceIndex = 0;

  for (let i = 0; i < myArray.length + alicesArray.length; i++) {
    // Empty arrays will have undefined elements
    // Also if one array finishes before the other it's
    // new head will be undefined
    const isMyArrDone = myIndex > myArray.length - 1;
    const isAlicesArrDone = aliceIndex > alicesArray.length - 1;

    // My array is not finished and my element is lower or Alice's array
    // is already finished
    if (
      !isMyArrDone &&
      (isAlicesArrDone || myArray[myIndex] < alicesArray[aliceIndex])
    ) {
      mergedArray.push(myArray[myIndex]);
      myIndex++;
    } else {
      // Either Alice's element is greater or my array is finished already
      mergedArray.push(alicesArray[aliceIndex]);
      aliceIndex++;
    }
  }

  return mergedArray;
}

// Tests

let desc = 'both arrays are empty';
let actual = mergeArrays([], []);
let expected = [];
assertDeepEqual(actual, expected, desc);

desc = 'first array is empty';
actual = mergeArrays([], [1, 2, 3]);
expected = [1, 2, 3];
assertDeepEqual(actual, expected, desc);

desc = 'second array is empty';
actual = mergeArrays([5, 6, 7], []);
expected = [5, 6, 7];
assertDeepEqual(actual, expected, desc);

desc = 'both arrays have some numbers';
actual = mergeArrays([2, 4, 6], [1, 3, 7]);
expected = [1, 2, 3, 4, 6, 7];
assertDeepEqual(actual, expected, desc);

desc = 'arrays are different lengths';
actual = mergeArrays([2, 4, 6, 8], [1, 7]);
expected = [1, 2, 4, 6, 7, 8];
assertDeepEqual(actual, expected, desc);

function assertDeepEqual(a, b, desc) {
  const aStr = JSON.stringify(a);
  const bStr = JSON.stringify(b);
  if (aStr !== bStr) {
    console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
  } else {
    console.log(`${desc} ... PASS`);
  }
}
