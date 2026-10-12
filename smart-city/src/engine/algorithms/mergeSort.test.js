import { runMergeSortTests } from './mergeSort.js';

const allPassed = runMergeSortTests();
if (!allPassed) {
  process.exit(1);
}
