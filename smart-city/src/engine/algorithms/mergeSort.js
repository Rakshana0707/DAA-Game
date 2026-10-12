/**
 * Merge Sort Algorithm using Divide and Conquer
 * 
 * Reusable implementation of Merge Sort that sorts arrays of primitive values
 * or complex objects via an optional custom comparator.
 * 
 * Time Complexity: O(n log n) in all cases (best, average, worst)
 * Space Complexity: O(n) auxiliary space for merging
 * Stability: Stable (preserves relative order of elements with equal keys)
 * 
 * @template T
 * @param {Array<T>} arr - The array to sort
 * @param {Function} [comparator] - Optional comparator function (a, b) => number.
 *                                  Returns negative if a < b, 0 if a === b, positive if a > b.
 *                                  Defaults to ascending order comparison.
 * @returns {Array<T>} A new sorted array
 */
export function mergeSort(arr, comparator = defaultComparator) {
  if (!Array.isArray(arr) || arr.length <= 1) {
    return Array.isArray(arr) ? [...arr] : [];
  }

  // Divide step: find midpoint
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // Conquer step: recursively sort left and right halves
  const sortedLeft = mergeSort(left, comparator);
  const sortedRight = mergeSort(right, comparator);

  // Combine step: merge sorted halves
  return merge(sortedLeft, sortedRight, comparator);
}

/**
 * Merges two sorted arrays into a single sorted array.
 * 
 * @template T
 * @param {Array<T>} left - Sorted left subarray
 * @param {Array<T>} right - Sorted right subarray
 * @param {Function} comparator - Comparison function
 * @returns {Array<T>} Merged sorted array
 */
function merge(left, right, comparator) {
  const result = [];
  let i = 0;
  let j = 0;

  // Compare elements from left and right arrays
  while (i < left.length && j < right.length) {
    // Stable comparison: if left[i] <= right[j], pick left[i]
    if (comparator(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // Append any remaining elements
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }

  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

/**
 * Default comparator for primitives in ascending order.
 */
function defaultComparator(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Basic automated tests to verify Merge Sort correctness.
 */
export function runMergeSortTests() {
  console.log("Running Divide and Conquer Merge Sort Tests...\n");

  const testCases = [
    {
      name: "Empty array",
      input: [],
      expected: []
    },
    {
      name: "One element",
      input: [42],
      expected: [42]
    },
    {
      name: "Already sorted array",
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5]
    },
    {
      name: "Reverse sorted array",
      input: [9, 7, 5, 3, 1],
      expected: [1, 3, 5, 7, 9]
    },
    {
      name: "Array with duplicate values",
      input: [4, 2, 7, 2, 4, 9, 1, 7],
      expected: [1, 2, 2, 4, 4, 7, 7, 9]
    },
    {
      name: "All identical elements",
      input: [5, 5, 5, 5, 5],
      expected: [5, 5, 5, 5, 5]
    },
    {
      name: "Negative numbers and zero",
      input: [-5, 12, 0, -14, 8, -1],
      expected: [-14, -5, -1, 0, 8, 12]
    },
    {
      name: "Sorting objects by property (ascending severity)",
      input: [
        { id: 'fire', severity: 7 },
        { id: 'med', severity: 8 },
        { id: 'acc', severity: 5 }
      ],
      comparator: (a, b) => a.severity - b.severity,
      expected: [
        { id: 'acc', severity: 5 },
        { id: 'fire', severity: 7 },
        { id: 'med', severity: 8 }
      ]
    },
    {
      name: "Sorting objects by property (descending urgency)",
      input: [
        { id: 'acc', urgency: 6 },
        { id: 'med', urgency: 9 },
        { id: 'fire', urgency: 8 }
      ],
      comparator: (a, b) => b.urgency - a.urgency,
      expected: [
        { id: 'med', urgency: 9 },
        { id: 'fire', urgency: 8 },
        { id: 'acc', urgency: 6 }
      ]
    },
    {
      name: "Stability test with objects with equal keys",
      input: [
        { id: 'item1', priority: 2, order: 1 },
        { id: 'item2', priority: 1, order: 2 },
        { id: 'item3', priority: 2, order: 3 },
        { id: 'item4', priority: 1, order: 4 }
      ],
      comparator: (a, b) => a.priority - b.priority,
      expected: [
        { id: 'item2', priority: 1, order: 2 },
        { id: 'item4', priority: 1, order: 4 },
        { id: 'item1', priority: 2, order: 1 },
        { id: 'item3', priority: 2, order: 3 }
      ]
    }
  ];

  let passed = 0;

  testCases.forEach((tc) => {
    const result = mergeSort(tc.input, tc.comparator);
    const isMatch = JSON.stringify(result) === JSON.stringify(tc.expected);

    if (isMatch) {
      console.log(`✅ Passed: ${tc.name}`);
      passed++;
    } else {
      console.error(
        `❌ Failed: ${tc.name}\n   Expected: ${JSON.stringify(tc.expected)}\n   Received: ${JSON.stringify(result)}`
      );
    }
  });

  console.log(`\nTest Results: ${passed}/${testCases.length} Passed.`);
  return passed === testCases.length;
}
