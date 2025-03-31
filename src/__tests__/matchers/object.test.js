describe("Objects", () => {
  /* eslint-disable vitest/prefer-strict-equal */
  test("`toEqual` - exact match with deep equality (excludes undefined)", () => {
    expect({ a: true, b: 4, c: undefined }).toEqual({ a: true, b: 4 });
    expect({ a: true, b: 4, c: undefined }).not.toEqual({ a: true });
  });
  /* eslint-enable */

  test("`toStrictEqual` - exact match with deep equality (includes undefined)", () => {
    expect({ a: true, b: 4, c: undefined }).toStrictEqual({
      a: true,
      b: 4,
      c: undefined,
    });
    expect({ a: true, b: 4, c: undefined }).not.toStrictEqual({
      a: true,
      b: 4,
    });
  });

  test("`toMatchObject` - partial match", () => {
    const actual = {
      a: true,
      b: 4,
      c: { d: [1, 2, 3], e: "hello" },
    };
    const expected = {
      a: true,
      c: { e: expect.stringMatching(/hello|goodbye/) },
    };

    expect(actual).toMatchObject(expected);
    expect(actual).toStrictEqual(
      expect.objectContaining({
        a: true,
        // Struggles with nested structures, must have all keys
        c: { d: [1, 2, 3], e: expect.stringMatching(/hello|goodbye/) },
      }),
    );
  });

  test("`objectContaining` - partial match", () => {
    const actual = {
      a: true,
      b: 4,
      c: { d: [1, 2, 3], e: "hello" },
    };

    expect(actual).toStrictEqual(
      expect.objectContaining({
        a: true,
        // Struggles with nested structures, must have all keys
        c: { d: [1, 2, 3], e: expect.stringMatching(/hello|goodbye/) },
      }),
    );
  });

  test("`toHaveProperty` - deep equality for individual properties", () => {
    const houseForSale = {
      bedrooms: 4,
      kitchen: {
        amenities: ["oven", "stove"],
        appliances: { dishwasher: "whirlpool", frigde: "ge" },
      },
    };

    expect(houseForSale).toHaveProperty("bedrooms");
    expect(houseForSale).toHaveProperty("bedrooms", 4);
    expect(houseForSale).not.toHaveProperty("pool");

    expect(houseForSale).toHaveProperty("kitchen.amenities[0]", "oven");
    expect(houseForSale).toHaveProperty(["kitchen", "amenities", 0], "oven");
    expect(houseForSale).toHaveProperty("kitchen.amenities", ["oven", "stove"]);
    expect(houseForSale).not.toHaveProperty("kitchen.amenities", ["oven"]);

    expect(houseForSale).toHaveProperty(
      "kitchen.appliances.dishwasher",
      "whirlpool",
    );
    expect(houseForSale).toHaveProperty(
      ["kitchen", "appliances", "dishwasher"],
      "whirlpool",
    );
    expect(houseForSale).toHaveProperty("kitchen.appliances", {
      dishwasher: "whirlpool",
      frigde: "ge",
    });
    expect(houseForSale).not.toHaveProperty("kitchen.appliances", {
      dishwasher: "whirlpool",
    });
  });
});
