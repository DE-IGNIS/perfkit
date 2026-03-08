import * as index from "../index.js";

let passed = 0;
let failed = 0;

type TestFuntion =  () => Promise<Object> ;

const it = (desc: string, fn: TestFuntion): void => {
  try {
    fn();
    passed++;
    console.log("\x1b[32m%s\x1b[0m", `\u2714 ${desc}`);
  } catch (error) {
    failed++;
    console.log("\n");
    console.log("\x1b[31m%s\x1b[0m", `\u2718 ${desc}`);
  }
};

function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

it("bench() should return valid results", async () => {
  assert(index.bench("Add 3 numbers", ) == assert.iterations === 1000, "Iterations should be 1000");
  assert(index.bench("Add 3 numbers", ) == assert.meanTime > 0, "Mean time greater than 0");
  assert(index.bench("Add 3 numbers", ) == assert.opsPerSec > 0, "OpsPerSec greater > 0");
});

console.log("\n");
console.log(`Passed:${passed}`);
console.log(`Failed:${failed}`);

if (failed > 0) {
  process.exit(1);
}
