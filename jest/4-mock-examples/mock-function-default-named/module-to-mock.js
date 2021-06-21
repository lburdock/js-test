/* eslint-disable no-console */
const getNow = () => new Date();
const oneHrInMs = 60 * 60 * 1000;

const isLiveNow = (date) => {
  console.log("isLiveNow actual");
  const diff = getNow() - new Date(date);
  return diff >= 0 && diff < oneHrInMs;
};

export const isBeforeNow = (date) => {
  console.log("isBeforeNow actual");
  return new Date(date) - getNow() < 0;
};

export default isLiveNow;
