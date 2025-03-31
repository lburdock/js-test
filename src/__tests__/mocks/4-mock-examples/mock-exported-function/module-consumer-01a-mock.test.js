import { namedFnConsumer, defaultFnConsumer } from "./module-consumer";

const mockIsLiveNow = vi.hoisted(() => vi.fn());
const mockIsBeforeNow = vi.hoisted(() => vi.fn());

vi.mock("./module-to-mock", () => ({
  default: mockIsLiveNow,
  isBeforeNow: mockIsBeforeNow,
}));

afterEach(() => {
  mockIsLiveNow.mockReset();
  mockIsBeforeNow.mockReset();
});

describe("ModuleConsumer", () => {
  describe("namedFnConsumer", () => {
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
