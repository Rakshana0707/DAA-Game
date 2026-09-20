/**
 * Binary Search Algorithm
 * 
 * Searches for a target value within a sorted array.
 * 
 * @param {Array<number>} sortedArray - The array to search, must be sorted.
 * @param {number} target - The value to find.
 * @returns {number} - The index of the target if found, otherwise -1.
 */
export function binarySearch(sortedArray, target) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    // Calculate mid point carefully to avoid integer overflow 
    // (though in JS it's less of an issue, it's good practice)
    const mid = Math.floor(left + (right - left) / 2);

    if (sortedArray[mid] === target) {
      return mid; // Target found
    }

    if (sortedArray[mid] < target) {
      left = mid + 1; // Target is in the right half
    } else {
      right = mid - 1; // Target is in the left half
    }
  }

  return -1; // Target not found
}

/**
 * Basic test cases to verify the correctness of the binary search implementation.
 * Can be run manually or imported into a test runner later.
 */
export function runBinarySearchTests() {
  console.log("Running Binary Search Tests...");

  const testCases = [
    { name: 'Target at beginning', array: [10, 20, 30, 40, 50], target: 10, expected: 0 },
    { name: 'Target in middle', array: [10, 20, 30, 40, 50], target: 30, expected: 2 },
    { name: 'Target at end', array: [10, 20, 30, 40, 50], target: 50, expected: 4 },
    { name: 'Target not present', array: [10, 20, 30, 40, 50], target: 25, expected: -1 },
    { name: 'Empty array', array: [], target: 10, expected: -1 },
  ];

  let passed = 0;

  testCases.forEach((tc) => {
    const result = binarySearch(tc.array, tc.target);
    if (result === tc.expected) {
      console.log(`✅ Passed: ${tc.name}`);
      passed++;
    } else {
      console.error(`❌ Failed: ${tc.name} | Expected ${tc.expected}, got ${result}`);
    }
  });

  console.log(`Test Results: ${passed}/${testCases.length} Passed.`);
}
