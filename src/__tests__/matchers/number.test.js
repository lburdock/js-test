describe("Numbers", () => {
  test("`toBe` - exact integer match", () => {
    expect(3).toBe(3);
    expect(Math.floor(3.001)).toBe(3);
    expect(3.001).not.toBe(3);
  });

  test.fails("FAILS: `toBe` - decimals are not equal in javascript", () => {
    expect(0.2 + 0.1).toBe(0.3);
  });

  test("`toBeCloseTo` - rounds decimal to match", () => {
    expect(0.2 + 0.1).toBeCloseTo(0.3, 5);
  });

  test("`toBeGreaterThan`", () => {
    expect(4).toBeGreaterThan(3);
    expect(3).not.toBeGreaterThan(3);
  });

  test("`toBeGreaterThanOrEqual`", () => {
    expect(3).toBeGreaterThanOrEqual(3);
    expect(2).not.toBeGreaterThanOrEqual(3);
  });

  test("`toBeLessThan`", () => {
    expect(2).toBeLessThan(3);
    expect(3).not.toBeLessThan(3);
  });

  test("`toBeLessThanOrEqual`", () => {
    expect(3).toBeLessThanOrEqual(3);
    expect(4).not.toBeLessThanOrEqual(3);
  });
});
