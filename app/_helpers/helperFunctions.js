export function calcRangeToDays(range) {
  if (!range || !range?.from || !range?.to) return 0;
  const differenceInTime = range.to.getTime() - range.from.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.round(differenceInDays) + 1;
}
