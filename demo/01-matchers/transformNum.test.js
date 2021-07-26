import transformNum from "./transformNum";

/**
 * List of Jest matchers: https://jestjs.io/docs/expect#methods
 */

describe("transformNum", () => {
  test("returns the correct data", () => {
    const result = transformNum(3);

    // result.num === 9
    expect(result.num).toBe(9);

    // result.num < 10
    expect(result.num).toBeLessThan(10);

    // result.str === "Number: 333"
    expect(result.str).toBe("Number: 333");

    // result.str.includes("333");
    expect(result.str).toContain("333");

    // /number: 3/i.test(result.str)
    expect(result.str).toMatch(/number: 3/i);

    // result.arr === [0, 1, 2]
    expect(result.arr).toEqual([0, 1, 2]);

    expect(result).toStrictEqual({
      num: 9,
      str: "Number: 333",
      arr: [0, 1, 2],
    });
  });

  test("no argument", () => {
    // expect(() => transformNum()).toThrow();
    expect(transformNum()).toBeNull();
  });
});
