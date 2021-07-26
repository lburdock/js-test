/**
 * Takes a number and uses it to create different data types
 * @param  {number} num Any number!
 */
const transformNum = (num) => {
  if (!num) return null;
  return {
    num: num * num,
    str: `Number: ${num.toString().repeat(num)}`,
    arr: Array.from({ length: num }, (_, i) => i),
  };
};

export default transformNum;
