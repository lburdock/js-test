import clsx from "./clsx";

describe("clsx", () => {
  test("joins the classnames correctly", () => {
    const result = clsx("a", false, "b", 0, "c", null, "d", undefined);
    const expected = "a b c d";
    expect(result).toBe(expected);
  });

  test("returns an empty string with all falsy value", () => {
    const result = clsx(false, 0, null, undefined);
    const expected = "";
    expect(result).toBe(expected);
  });

  test("returns an empty string without args", () => {
    const result = clsx();
    const expected = "";
    expect(result).toBe(expected);
  });
});
