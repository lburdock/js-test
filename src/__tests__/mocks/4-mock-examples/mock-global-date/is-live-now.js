const oneHrInMs = 60 * 60 * 1000;

const isLiveTest = (date) => {
  const diff = new Date() - new Date(date);
  return diff >= 0 && diff < oneHrInMs;
};

const isLiveNow = (date) => {
  if (isLiveTest(date)) return "This event is live!";
  return "This event is not live.";
};

export default isLiveNow;
