export function degToRad(deg: number): number { return (deg * Math.PI) / 180; }
export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angle = degToRad(angleDeg - 90);
  const x = cx + r * Math.cos(angle);
  const y = cy + r * Math.sin(angle);
  return { x, y };
}
