export const convertWithCommas = (input: number): string => {
  return input.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
