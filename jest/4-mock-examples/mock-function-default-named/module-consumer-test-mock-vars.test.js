import { isBeforeNowConsumer, isLiveNowConsumer } from "./module-consumer";

jest.mock("./module-to-mock");

// THIS SEEMS LIKE IT SHOULD WORK, BUT IT DOESN'T
const mockIsLiveNow = jest.fn();
const mockIsBeforeNow = jest.fn();
jest.mock("./module-to-mock", () => ({
  __esModule: true,
  isLiveNow: mockIsLiveNow,
  isBeforeNow: mockIsBeforeNow,
}));

// SKIPPED BECAUSE THIS MOCKING METHOD DOESN'T WORK
describe.skip("ModuleConsumer", () => {
  describe("isBeforeNowConsumer", () => {
    afterEach(() => {
      mockIsBeforeNow.mockReset();
    });

    test("date is in the past", () => {
      mockIsBeforeNow.mockReturnValue(true);
      expect(isBeforeNowConsumer("fake-date")).toBe(
        "This date is in the past!"
      );
    });

    test("date is in the future", () => {
      mockIsBeforeNow.mockReturnValue(false);
      expect(isBeforeNowConsumer("fake-date")).toBe(
        "This date is in the future!"
      );
    });
  });

  describe("isLiveNowConsumer", () => {
    afterEach(() => {
      mockIsLiveNow.mockReset();
    });

    test("date is live", () => {
      mockIsLiveNow.mockReturnValue(true);
      expect(isLiveNowConsumer("fake-date")).toBe("This event is live!");
    });

    test("date is not live", () => {
      mockIsLiveNow.mockReturnValue(false);
      expect(isLiveNowConsumer("fake-date")).toBe("This event is not live.");
    });
  });
});
