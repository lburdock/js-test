import { isBeforeNow } from "./utils";

const getEventStatus = (event) => {
  if (isBeforeNow(event.date)) {
    return "This event is over!";
  }

  return "This event is upcoming!";
};

export default getEventStatus;
