import { runMaxMinTests } from './maxMin.js';

const allPassed = runMaxMinTests();
if (!allPassed) {
  process.exit(1);
}
