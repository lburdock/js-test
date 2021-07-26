/* eslint-disable no-console */
const getNow = () => new Date();

export const isBeforeNow = (date) => {
  console.log("isBeforeNow actual", date);
  return new Date(date) - getNow() < 0;
};
