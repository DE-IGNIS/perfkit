import * as index from "../index.js";

let passed = 0;
let failed = 0;

type TestFuntion = () => Promise<Object>;

const it = async (desc: string, fn: TestFuntion): Promise<void> => {
  try {
    await fn();
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

await it("bench() should return valid results",  async () =>  {
  const result = await index.bench("test", () => {
        1+1
  });
  assert(result.iterations === 1000, "iterations should be 1000");
  assert(result.meanTime > 0, "meanTime should be > 0");
  assert(result.opsPerSec > 0, "opsPerSec should be > 0");
});


console.log("\n");
console.log(`Passed:${passed}`);
console.log(`Failed:${failed}`);

if (failed > 0) {
  process.exit(1);
}
