import { isBeforeNowConsumer, isLiveNowConsumer } from "./module-consumer";

// If you don't need to change the return value for each test
jest.mock("./module-to-mock", () => ({
  __esModule: true,
  default: jest.fn(() => false),
  isBeforeNow: jest.fn(() => true),
}));

describe("ModuleConsumer", () => {
  describe("isBeforeNowConsumer", () => {
    test("date is in the past", () => {
      expect(isBeforeNowConsumer("fake-date")).toBe(
        "This date is in the past!"
      );
    });
  });

  describe("isLiveNowConsumer", () => {
    test("date is not live", () => {
      expect(isLiveNowConsumer("fake-date")).toBe("This event is not live.");
    });
  });
});
