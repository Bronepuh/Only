export function getAngles(count: number): number[] {
  if (count < 2) return [-90];
  const step = 360 / count;
  return Array.from({ length: count }, (_, i) => -90 + i * step);
}
