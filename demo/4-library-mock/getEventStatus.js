import isBefore from "date-fns/isBefore";

const getEventStatus = (event) => {
  if (isBefore(new Date(event.date), new Date())) {
    return "This event is over!";
  }

  return "This event is upcoming!";
};

export default getEventStatus;
