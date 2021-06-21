describe("Test syntax", () => {
  test("works", () => {
    expect("a").toBe("a");
  });
});

describe("Duplicating tests", () => {
  describe("Array table", () => {
    test.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])("%i + %i === %i", (a, b, expected) => {
      expect(a + b).toBe(expected);
    });

    test.each([
      { a: 1, b: 1, expected: 2 },
      { a: 1, b: 2, expected: 3 },
      { a: 2, b: 1, expected: 3 },
    ])("$a + $b === $expected", ({ a, b, expected }) => {
      expect(a + b).toBe(expected);
    });
  });

  describe("Tagged template literal table", () => {
    test.each`
      a    | b    | expected
      ${1} | ${1} | ${2}
      ${1} | ${2} | ${3}
      ${2} | ${1} | ${3}
    `("$a + $b === $expected", ({ a, b, expected }) => {
      expect(a + b).toBe(expected);
    });
  });
});

describe("Duplicating test suites", () => {
  describe.each([
    { a: 1, b: 1, expected: 2 },
    { a: 1, b: 2, expected: 3 },
    { a: 2, b: 1, expected: 3 },
  ])("$a + $b", ({ a, b, expected }) => {
    test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
    });

    test(`returned value not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected);
    });

    test(`returned value not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected);
    });
  });
});
