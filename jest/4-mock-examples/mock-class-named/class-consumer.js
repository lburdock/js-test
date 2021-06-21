import { ClassToMock } from "./class-to-mock";

const classConsumer = (date) => {
  const myClass = new ClassToMock();
  if (myClass.isBeforeNow(date)) return "This date is in the past!";

  return "This date is in the future!";
};

export default classConsumer;
