describe("Booleans", () => {
  describe("`toBeTruthy`", () => {
    test.each([
      { value: true },
      { value: 1 },
      { value: "0" },
      { value: [] },
      { value: {} },
    ])("$value is truthy", ({ value }) => {
      expect(value).toBeTruthy();
    });
  });

  describe("`toBeFalsy`", () => {
    test.each([
      { value: false },
      { value: 0 },
      { value: "" },
      { value: null },
      { value: undefined },
      { value: NaN },
    ])("$value is falsy", ({ value }) => {
      expect(value).toBeFalsy();
    });
  });

  test("`toBeNaN`", () => {
    expect(NaN).toBeNaN();
    expect(null).not.toBeNaN();
  });

  test("`toBeNull`", () => {
    expect(null).toBeNull();
    expect(undefined).not.toBeNull();
  });

  test("`toBeUndefined`", () => {
    expect(undefined).toBeUndefined();
    expect(null).toBeDefined();
  });

  describe("`toBeDefined`", () => {
    test.each([
      { value: false },
      { value: 0 },
      { value: "" },
      { value: null },
      { value: NaN },
    ])("$value is defined", ({ value }) => {
      expect(value).toBeDefined();
    });

    test("undefined is not defined", () => {
      expect(undefined).toBeUndefined();
    });
  });
});
