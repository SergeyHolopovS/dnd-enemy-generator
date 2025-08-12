export default function countModificator(value: number) {
  for (let x = 10; x >= -5; x--) {
    if (value >= (x + 5) * 2) return x;
  }
  return 999;
}
