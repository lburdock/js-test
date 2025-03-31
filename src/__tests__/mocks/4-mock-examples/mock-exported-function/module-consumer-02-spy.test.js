import * as ModuleToMock from "./module-to-mock";
import { namedFnConsumer, defaultFnConsumer } from "./module-consumer";

describe("ModuleConsumer", () => {
  describe("namedFnConsumer", () => {
    let mockIsBeforeNow;

    beforeEach(() => {
      mockIsBeforeNow = vi.spyOn(ModuleToMock, "isBeforeNow");
    });

    afterEach(() => {
      mockIsBeforeNow.mockReset();
    });

    test("date is in the past", () => {
      mockIsBeforeNow.mockReturnValue(true);
      expect(namedFnConsumer("fake-date")).toBe("This date is in the past!");
    });

    test("date is in the future", () => {
      mockIsBeforeNow.mockReturnValue(false);
      expect(namedFnConsumer("fake-date")).toBe("This date is in the future!");
    });
  });

  describe("defaultFnConsumer", () => {
    let mockIsLiveNow;

    beforeEach(() => {
      mockIsLiveNow = vi.spyOn(ModuleToMock, "default");
    });

    afterEach(() => {
      mockIsLiveNow.mockReset();
    });

    test("date is live", () => {
      mockIsLiveNow.mockReturnValue(true);
      expect(defaultFnConsumer("fake-date")).toBe("This event is live!");
    });

    test("date is not live", () => {
      mockIsLiveNow.mockReturnValue(false);
      expect(defaultFnConsumer("fake-date")).toBe("This event is not live.");
    });
  });
});
