import getEventStatus from "./getEventStatus";

describe("getEventStatus", () => {
  test("the event is over", () => {
    const event = { date: "2021-06-01T12:00:00.000Z" };
    const expected = "This event is over!";
    expect(getEventStatus(event)).toBe(expected);
  });

  test("the event is upcoming", () => {
    const event = { date: "2021-08-01T12:00:00.000Z" };
    const expected = "This event is upcoming!";
    expect(getEventStatus(event)).toBe(expected);
  });
});
