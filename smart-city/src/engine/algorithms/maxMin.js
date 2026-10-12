/**
 * Maximum and Minimum Algorithm using Divide and Conquer
 * 
 * Efficiently determines both the minimum and maximum values of a numeric array
 * by dividing the array into halves, recursively solving subproblems, and combining
 * the results without using Math.min(), Math.max(), or Array.sort().
 * 
 * Time Complexity: O(n) with 3n/2 - 2 comparisons
 * Space Complexity: O(log n) call stack space
 * 
 * @param {Array<number>} arr - Array of numeric values
 * @returns {{ minimum: number | null, maximum: number | null }} An object containing minimum and maximum
 */
export function findMinMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return {
      minimum: null,
      maximum: null
    };
  }

  return findMinMaxDivideAndConquer(arr, 0, arr.length - 1);
}

/**
 * Recursive divide-and-conquer helper.
 * 
 * @param {Array<number>} arr - The array being processed
 * @param {number} low - Starting index of the current subarray
 * @param {number} high - Ending index of the current subarray
 * @returns {{ minimum: number, maximum: number }}
 */
function findMinMaxDivideAndConquer(arr, low, high) {
  // Base Case 1: Exactly 1 element
  if (low === high) {
    return {
      minimum: arr[low],
      maximum: arr[low]
    };
  }

  // Base Case 2: Exactly 2 elements
  if (high === low + 1) {
    if (arr[low] < arr[high]) {
      return {
        minimum: arr[low],
        maximum: arr[high]
      };
    } else {
      return {
        minimum: arr[high],
        maximum: arr[low]
      };
    }
  }

  // Divide step: calculate midpoint
  const mid = Math.floor(low + (high - low) / 2);

  // Conquer step: recursively find min and max in left and right halves
  const leftResult = findMinMaxDivideAndConquer(arr, low, mid);
  const rightResult = findMinMaxDivideAndConquer(arr, mid + 1, high);

  // Combine step: determine global min and max without Math.min / Math.max
  const minimum = leftResult.minimum < rightResult.minimum
    ? leftResult.minimum
    : rightResult.minimum;

  const maximum = leftResult.maximum > rightResult.maximum
    ? leftResult.maximum
    : rightResult.maximum;

  return {
    minimum,
    maximum
  };
}

// Reusable alias export
export const maxMinDivideAndConquer = findMinMax;

/**
 * Basic automated tests to verify algorithm correctness across all edge cases.
 */
export function runMaxMinTests() {
  console.log("Running Divide and Conquer Maximum and Minimum Tests...\n");

  const testCases = [
    {
      name: "Empty array",
      input: [],
      expected: { minimum: null, maximum: null }
    },
    {
      name: "One element",
      input: [42],
      expected: { minimum: 42, maximum: 42 }
    },
    {
      name: "Two elements (ascending)",
      input: [10, 20],
      expected: { minimum: 10, maximum: 20 }
    },
    {
      name: "Two elements (descending)",
      input: [99, 14],
      expected: { minimum: 14, maximum: 99 }
    },
    {
      name: "Two elements (equal)",
      input: [7, 7],
      expected: { minimum: 7, maximum: 7 }
    },
    {
      name: "Multiple elements (odd length)",
      input: [8, 3, 9, 1, 6],
      expected: { minimum: 1, maximum: 9 }
    },
    {
      name: "Multiple elements (even length)",
      input: [24, 12, 65, 8, 43, 90],
      expected: { minimum: 8, maximum: 90 }
    },
    {
      name: "Duplicate values throughout",
      input: [5, 2, 8, 2, 5, 8, 2, 8],
      expected: { minimum: 2, maximum: 8 }
    },
    {
      name: "All identical elements",
      input: [4, 4, 4, 4],
      expected: { minimum: 4, maximum: 4 }
    },
    {
      name: "Negative numbers and zero",
      input: [-15, 0, -2, 45, -30, 18],
      expected: { minimum: -30, maximum: 45 }
    },
    {
      name: "Incident severity values (Level 2 sample: [8, 7, 5])",
      input: [8, 7, 5],
      expected: { minimum: 5, maximum: 8 }
    },
    {
      name: "Incident urgency values (Level 2 sample: [9, 8, 6])",
      input: [9, 8, 6],
      expected: { minimum: 6, maximum: 9 }
    }
  ];

  let passed = 0;

  testCases.forEach((tc) => {
    const result = findMinMax(tc.input);
    const isMinEqual = result.minimum === tc.expected.minimum;
    const isMaxEqual = result.maximum === tc.expected.maximum;

    if (isMinEqual && isMaxEqual) {
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
