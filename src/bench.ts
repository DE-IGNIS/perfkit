import { performance } from "node:perf_hooks";

interface BenchOptions {
  N?: number;
  warmup?: number;
}

interface BenchResult {
  iterations: number;
  meanTime: number;
  p95: number | undefined;
  p99: number | undefined;
  opsPerSec: number;
}

type benchFunction = () => void;

export async function bench(
  benchmarkName: string,
  fn: benchFunction,
  options?: BenchOptions,
): Promise<BenchResult> {
  let result: number[] = [];
  let i: number;
  let currentTime, currentTimeAfter, currentTimeBefore: number;
  let totalTime: number;

  totalTime = 0;

  const N = options?.N ?? 1000;

  const warmup = options?.warmup ?? 50;

  for (i = 0; i != warmup; i++) {
    fn();
  }

  for (i = 0; i != N; i++) {
    currentTimeBefore = performance.now();
    fn();
    currentTimeAfter = performance.now();
    currentTime = currentTimeAfter - currentTimeBefore;

    totalTime += currentTime;
    result.push(currentTime);
  }

  result.sort((a, b) => a - b);

  let mean: number;
  mean = totalTime / N;

  return {
    iterations: N,
    meanTime: mean,
    p95: result[Math.floor(N * 0.95)],
    p99: result[Math.floor(N * 0.99)],
    opsPerSec: N / mean,
  };
}
