import isLiveNow, { isBeforeNow } from "./module-to-mock";
import { isBeforeNowConsumer, isLiveNowConsumer } from "./module-consumer";

jest.mock("./module-to-mock");

describe("ModuleConsumer", () => {
  describe("isBeforeNowConsumer", () => {
    afterEach(() => {
      isBeforeNow.mockReset();
    });

    test("date is in the past", () => {
      isBeforeNow.mockReturnValue(true);
      expect(isBeforeNowConsumer("fake-date")).toBe(
        "This date is in the past!"
      );
    });

    test("date is in the future", () => {
      isBeforeNow.mockReturnValue(false);
      expect(isBeforeNowConsumer("fake-date")).toBe(
        "This date is in the future!"
      );
    });
  });

  describe("isLiveNowConsumer", () => {
    afterEach(() => {
      isLiveNow.mockReset();
    });

    test("date is live", () => {
      isLiveNow.mockReturnValue(true);
      expect(isLiveNowConsumer("fake-date")).toBe("This event is live!");
    });

    test("date is not live", () => {
      isLiveNow.mockReturnValue(false);
      expect(isLiveNowConsumer("fake-date")).toBe("This event is not live.");
    });
  });
});
