import { defaultClassConsumer, namedClassConsumer } from "./class-consumer";

const mockIsLiveNow = vi.hoisted(() => vi.fn());
const mockIsBeforeNow = vi.hoisted(() => vi.fn());

vi.mock("./class-to-mock", () => ({
  default: vi.fn(() => ({ isLiveNow: mockIsLiveNow })),
  NamedClassToMock: vi.fn(() => ({ isBeforeNow: mockIsBeforeNow })),
}));

afterEach(() => {
  mockIsLiveNow.mockReset();
  mockIsBeforeNow.mockReset();
});

describe("ClassConsumer", () => {
  describe("defaultClassConsumer", () => {
    test("Past date", () => {
      mockIsLiveNow.mockReturnValue(true);
      expect(defaultClassConsumer("fake-date")).toBe("This event is live!");
    });

    test("Future date", () => {
      mockIsLiveNow.mockReturnValue(false);
      expect(defaultClassConsumer("fake-date")).toBe("This event is not live.");
    });
  });

  describe("namedClassConsumer", () => {
    test("Past date", () => {
      mockIsBeforeNow.mockReturnValue(true);
      expect(namedClassConsumer("fake-date")).toBe("This date is in the past!");
    });

    test("Future date", () => {
      mockIsBeforeNow.mockReturnValue(false);
      expect(namedClassConsumer("fake-date")).toBe(
        "This date is in the future!",
      );
    });
  });
});
