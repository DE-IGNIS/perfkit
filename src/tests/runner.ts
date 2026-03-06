import * as index from "../index.js";

let passed = 0;
let failed = 0;

type TestFuntion = () => void;

const it = (desc: string, fn: TestFuntion): void => {
  try {
    fn();
    passed++;
    console.log("\x1b[32m%s\x1b[0m", `\u2714 ${desc}`);
    // console.log(`Passed: ${desc}`);
  } catch (error) {
    failed++;
    console.log("\n");
    console.log("\x1b[31m%s\x1b[0m", `\u2718 ${desc}`);
    // console.log(`Failed: ${desc}`);
  }
};

function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

it("Should return the sum of two numbers", () => {
  assert(index.sum(5, 10) == 15, "Sum should be 15");
});

console.log("\n");
console.log(`Passed:${passed}`);
console.log(`Failed:${failed}`);

if (failed > 0) {
  process.exit(1);
}
