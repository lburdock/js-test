import isLiveNow, { isBeforeNow } from "./module-to-mock";
import { namedFnConsumer, defaultFnConsumer } from "./module-consumer";

vi.mock("./module-to-mock");

describe("ModuleConsumer", () => {
  describe("namedFnConsumer", () => {
    afterEach(() => {
      isBeforeNow.mockReset();
    });

    test("date is in the past", () => {
      isBeforeNow.mockReturnValue(true);
      expect(namedFnConsumer("fake-date")).toBe("This date is in the past!");
    });

    test("date is in the future", () => {
      isBeforeNow.mockReturnValue(false);
      expect(namedFnConsumer("fake-date")).toBe("This date is in the future!");
    });
  });

  describe("defaultFnConsumer", () => {
    afterEach(() => {
      isLiveNow.mockReset();
    });

    test("date is live", () => {
      isLiveNow.mockReturnValue(true);
      expect(defaultFnConsumer("fake-date")).toBe("This event is live!");
    });

    test("date is not live", () => {
      isLiveNow.mockReturnValue(false);
      expect(defaultFnConsumer("fake-date")).toBe("This event is not live.");
    });
  });
});
