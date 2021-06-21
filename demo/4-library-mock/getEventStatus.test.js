import isBefore from "date-fns/isBefore";
import getEventStatus from "./getEventStatus";

jest.mock("date-fns/isBefore");

describe("getEventStatus", () => {
  test("the event is over", () => {
    isBefore.mockReturnValue(true);
    const event = { date: "2021-06-01T12:00:00.000Z" };
    const expected = "This event is over!";
    expect(getEventStatus(event)).toBe(expected);
    expect(isBefore.mock.calls[0][0]).toEqual(
      new Date("2021-06-01T12:00:00.000Z")
    );
  });

  test("the event is upcoming", () => {
    isBefore.mockReturnValue(false);
    const event = { date: "2021-07-01T12:00:00.000Z" };
    const expected = "This event is upcoming!";
    expect(getEventStatus(event)).toBe(expected);
    expect(isBefore.mock.calls[0][0]).toEqual(
      new Date("2021-07-01T12:00:00.000Z")
    );
  });
});
