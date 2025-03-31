describe("Arrays", () => {
  const testArray = ["a", { b: 1 }];

  test.fails("FAILS: `.toBe` uses shallow equality", () => {
    expect(testArray).toBe(["a", { b: 1 }]);
  });

  /* eslint-disable vitest/prefer-strict-equal */
  test("`toEqual` - exact match with deep equality", () => {
    expect(testArray).toEqual(["a", { b: 1 }]);
    expect(testArray).not.toEqual(["a"]);
  });
  /* eslint-enable */

  test("`toStrictEqual` - exact match with deep equality", () => {
    expect(testArray).toStrictEqual(["a", { b: 1 }]);
    expect(testArray).not.toStrictEqual(["a"]);
  });

  test("`toContain('a')` - partial match with shallow equality", () => {
    expect(testArray).toContain("a");
    expect(testArray).not.toContain("d");
  });

  test.fails("FAILS: `toContain({ b: 1 })` uses shallow equality", () => {
    expect(testArray).toContain({ b: 1 });
  });

  test("`toContainEqual({ b: 1 })` - partial match with deep equality", () => {
    expect(testArray).toContainEqual({ b: 1 });
    expect(testArray).not.toContainEqual("d");
  });

  test("`arrayContaining({ b: 1 })` - partial match with deep equality", () => {
    expect(testArray).toStrictEqual(expect.arrayContaining([{ b: 1 }]));
    expect(testArray).not.toStrictEqual(expect.arrayContaining([{ c: 1 }]));
  });

  test("`toHaveLength`", () => {
    expect(testArray).toHaveLength(2);
    expect(testArray).not.toHaveLength(5);
  });
});
