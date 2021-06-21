import isLiveNow from "./is-live-now";

const currentDate = "2020-10-01T10:00:00.000Z";
const liveDate = "2020-10-01T09:01:00.000Z";
const notLiveDate = "2020-10-01T10:01:00.000Z";

describe("isLiveNow", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern").setSystemTime(new Date(currentDate).getTime());
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("date is live", () => {
    expect(isLiveNow(liveDate)).toBe("This event is live!");
  });

  test("date is not live", () => {
    expect(isLiveNow(notLiveDate)).toBe("This event is not live.");
  });
});
