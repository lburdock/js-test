import classConsumer from "./class-consumer";

/**
 * THIS VARIABLE NAME MUST START WITH `mock`.
 * This allows it to be initialized correctly since
 * calls to jest.mock() are hoisted to the top of the file.
 */
const mockIsBeforeNow = jest.fn();

jest.mock("./class-to-mock", () => {
  return {
    ClassToMock: jest.fn(() => ({
      isBeforeNow: mockIsBeforeNow,
    })),
  };
});

describe("classConsumer", () => {
  afterEach(() => {
    mockIsBeforeNow.mockReset();
  });

  test("Past date", () => {
    mockIsBeforeNow.mockReturnValue(true);
    expect(classConsumer("fake-date")).toBe("This date is in the past!");
  });

  test("Future date", () => {
    mockIsBeforeNow.mockReturnValue(false);
    expect(classConsumer("fake-date")).toBe("This date is in the future!");
  });
});
