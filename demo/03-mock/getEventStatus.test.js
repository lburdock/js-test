import { isBeforeNow } from "./utils";
import getEventStatus from "./getEventStatus";

jest.mock("./utils");

describe("getEventStatus", () => {
  test("the event is over", () => {
    isBeforeNow.mockReturnValue(true);
    const event = { date: "2021-06-01T12:00:00.000Z" };
    const expected = "This event is over!";
    expect(getEventStatus(event)).toBe(expected);
    expect(isBeforeNow).toHaveBeenCalledWith("2021-06-01T12:00:00.000Z");
  });

  test("the event is upcoming", () => {
    isBeforeNow.mockReturnValue(false);
    const event = { date: "2021-08-01T12:00:00.000Z" };
    const expected = "This event is upcoming!";
    expect(getEventStatus(event)).toBe(expected);
    expect(isBeforeNow).toHaveBeenCalledWith("2021-08-01T12:00:00.000Z");
  });
});
