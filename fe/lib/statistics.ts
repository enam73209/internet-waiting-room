export function calculatePercentageDifference(guess: number, actual: number): number {
  return Math.abs(guess - actual);
}

export function formatVisitorCount(count: number): string {
  return count.toLocaleString();
}

export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}
