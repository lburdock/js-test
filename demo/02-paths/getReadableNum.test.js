import getReadableNum from "./getReadableNum";

describe("getReadableNum", () => {
  test("10100000 should return 10.1M", () => {
    const num = 10100000;
    const expected = "10.1M";
    expect(getReadableNum(num)).toBe(expected);
  });
});
