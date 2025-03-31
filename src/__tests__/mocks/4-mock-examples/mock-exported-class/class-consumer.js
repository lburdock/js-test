import DefaultClassToMock, { NamedClassToMock } from "./class-to-mock";

export const defaultClassConsumer = date => {
  const myClass = new DefaultClassToMock();
  if (myClass.isLiveNow(date)) return "This event is live!";
  return "This event is not live.";
};

export const namedClassConsumer = date => {
  const myClass = new NamedClassToMock();
  if (myClass.isBeforeNow(date)) return "This date is in the past!";
  return "This date is in the future!";
};
