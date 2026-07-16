export const formatNumber = (num) => {
  if (num === null || num === undefined) return "-";

  const abs = Math.abs(num);

  if (abs >= 1e12) {
    return `₹${(num / 1e12).toFixed(2)} T`;
  }

  if (abs >= 1e9) {
    return `₹${(num / 1e9).toFixed(2)} B`;
  }

  if (abs >= 1e6) {
    return `₹${(num / 1e6).toFixed(2)} M`;
  }

  if (abs >= 1e3) {
    return `₹${(num / 1e3).toFixed(2)} K`;
  }

  return `₹${num}`;
};