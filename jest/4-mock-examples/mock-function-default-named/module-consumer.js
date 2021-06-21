import isLiveNow, { isBeforeNow } from "./module-to-mock";

export const isBeforeNowConsumer = (date) => {
  if (isBeforeNow(date)) return "This date is in the past!";
  return "This date is in the future!";
};

export const isLiveNowConsumer = (date) => {
  if (isLiveNow(date)) return "This event is live!";
  return "This event is not live.";
};
