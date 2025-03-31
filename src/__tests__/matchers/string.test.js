describe("Strings", () => {
  test("`toBe` - exact match", () => {
    expect("abc").toBe("abc");
    expect("abc").not.toBe("b");
  });

  test("`toContain` - string partial match", () => {
    expect("abc").toContain("b");
    expect("abc").not.toContain("B");
  });

  test("`toMatch` - regex partial match", () => {
    expect("abc").toMatch(/B/i);
    expect("abc").not.toMatch(/\d/i); // Matches a string with a digit
  });

  test("`stringContaining` - string partial match", () => {
    expect("abc").toStrictEqual(expect.stringContaining("b"));
    expect("abc").toStrictEqual(expect.not.stringContaining("B"));
  });

  test("`stringMatching` - regex partial match", () => {
    expect("abc").toStrictEqual(expect.stringMatching(/B/i));
    expect("abc").toStrictEqual(expect.not.stringMatching(/\d/i));
  });

  test("`toHaveLength`", () => {
    expect("abc").toHaveLength(3);
    expect("abc").not.toHaveLength(1);
  });
});
