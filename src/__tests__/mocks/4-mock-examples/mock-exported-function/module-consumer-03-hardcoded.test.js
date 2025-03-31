import { namedFnConsumer, defaultFnConsumer } from "./module-consumer";

// If you don't need to change the return value for each test
vi.mock("./module-to-mock", () => ({
  __esModule: true,
  default: vi.fn(() => false),
  isBeforeNow: vi.fn(() => true),
}));

describe("ModuleConsumer", () => {
  describe("namedFnConsumer", () => {
    test("date is in the past", () => {
      expect(namedFnConsumer("fake-date")).toBe("This date is in the past!");
    });
  });

  describe("defaultFnConsumer", () => {
    test("date is not live", () => {
      expect(defaultFnConsumer("fake-date")).toBe("This event is not live.");
    });
  });
});
