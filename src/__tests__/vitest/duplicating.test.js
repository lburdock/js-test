const foo = () => "bar";

describe("Test syntax", () => {
  test("works", () => {
    expect(foo()).toBe("bar");
  });
});

describe("test.each", () => {
  describe("array of arrays", () => {
    test.each([
      [1, 2, 3],
      [4, 5, 9],
    ])("%i + %i === %i", (a, b, expected) => {
      expect(a + b).toBe(expected);
    });
  });

  describe("Array of objects", () => {
    test.each([
      { a: 1, b: 2, expected: 3 },
      { a: 4, b: 5, expected: 9 },
    ])("$a + $b === $expected", ({ a, b, expected }) => {
      expect(a + b).toBe(expected);
    });
  });

  describe("Tagged template literal table", () => {
    test.each`
      a    | b    | expected
      ${1} | ${2} | ${3}
      ${4} | ${5} | ${9}
    `("$a + $b === $expected", ({ a, b, expected }) => {
      expect(a + b).toBe(expected);
    });
  });
});

describe("Duplicating test suites", () => {
  describe.each([
    { a: 1, b: 2, expected: 3 },
    { a: 4, b: 5, expected: 9 },
  ])("$a + $b", ({ a, b, expected }) => {
    test(`to not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected);
    });

    test(`to not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected);
    });
  });
});
