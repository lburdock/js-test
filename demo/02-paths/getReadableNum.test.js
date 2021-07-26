import getReadableNum from "./getReadableNum";

describe("getReadableNum", () => {
  test.each([
    { num: 10100000, expected: "10.1M" },
    { num: 10000000, expected: "10M" },
    { num: 10100, expected: "10.1K" },
    { num: 10000, expected: "10K" },
    { num: 999, expected: "999" },
    { num: NaN, expected: "" },
    { num: undefined, expected: "" },
  ])("$num should return $expected", ({ num, expected }) => {
    expect(getReadableNum(num)).toBe(expected);
  });
});
