import isLiveNow from "./is-live-now";

const currentDate = "2020-10-01T10:00:00.000Z";
const mockCurrentDate = new Date(currentDate);

const liveDate = "2020-10-01T09:01:00.000Z";
const mockLiveDate = new Date(liveDate);

const notLiveDate = "2020-10-01T10:01:00.000Z";
const mockNotLiveDate = new Date(notLiveDate);

describe("isLiveNow", () => {
  let mockDateConstructor;

  beforeAll(() => {
    mockDateConstructor = vi
      .spyOn(global, "Date")
      .mockImplementation(dateStr => {
        switch (dateStr) {
          case liveDate:
            return mockLiveDate;
          case notLiveDate:
            return mockNotLiveDate;
          default:
            return mockCurrentDate;
        }
      });
  });

  afterAll(() => {
    mockDateConstructor.mockClear();
  });

  test("date is live", () => {
    expect(isLiveNow(liveDate)).toBe("This event is live!");
  });

  test("date is not live", () => {
    expect(isLiveNow(notLiveDate)).toBe("This event is not live.");
  });
});
