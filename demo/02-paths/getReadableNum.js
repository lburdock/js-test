// Removes the decimal if it is 0
const removeZero = (num) => num.toFixed(1).replace(/\.0$/, "");

/**
 * Converts large numbers to a easier to read string
 * (i.e. 10,100,000 becomes 10.1M)
 * @param {number} num
 * @returns Abbreviated number string
 */
const getReadableNum = (num) => {
  if (!Number.isFinite(num)) return "";

  if (num >= 1000000) {
    return `${removeZero(num / 1000000)}M`;
  }

  if (num >= 1000) {
    return `${removeZero(num / 1000)}K`;
  }

  return num.toString();
};

export default getReadableNum;
