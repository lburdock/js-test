describe("Basic", () => {
  test("primitive equality", () => {
    expect("a").toBe("a");
    expect("a").not.toBe("b");
  });

  test("deep equality", () => {
    expect({ a: "b", c: undefined }).toEqual({ a: "b" });
    expect({ a: "b", c: undefined }).toStrictEqual({ a: "b", c: undefined });
  });
});

describe("Booleans", () => {
  test("values", () => {
    expect(NaN).toBeNaN();
    expect(null).toBeNull();
    expect("a").toBeDefined();
    expect(undefined).toBeUndefined();
  });

  test.each([
    { value: false },
    { value: 0 },
    { value: "" },
    { value: null },
    { value: undefined },
    { value: NaN },
  ])("$value should be falsy", ({ value }) => {
    expect(value).toBeFalsy();
  });

  test.each([{ value: true }, { value: "0" }, { value: [] }, { value: {} }])(
    "$value should be truthy",
    ({ value }) => {
      expect(value).toBeTruthy();
    }
  );
});

describe("Numbers", () => {
  test("equality", () => {
    expect(3).toBe(3);
    expect(0.2 + 0.1).toBeCloseTo(0.3, 5); // Because .toBe(0.3) fails!
  });

  test("greater than", () => {
    expect(11).toBeGreaterThan(10);
    expect(10).toBeGreaterThanOrEqual(10);
  });

  test("less than", () => {
    expect(9).toBeLessThan(10);
    expect(10).toBeLessThanOrEqual(10);
  });
});

describe("Strings", () => {
  test("exact match", () => {
    expect("Hello World").toBe("Hello World");
    expect("Hello World").not.toBe("Hello Universe");
  });

  test("partial match - string", () => {
    expect("Hello World").toContain("Hello");
    expect("Hello World").not.toContain("World!");

    expect("Hello World").toEqual(expect.stringContaining("Hello"));
    expect("Hello World").toEqual(expect.not.stringContaining("World!"));
  });

  test("partial match - regex", () => {
    expect("Hello    World").toMatch(/hello\s+world/i);
    expect("HelloWorld").not.toMatch(/hello\s+world/i);

    expect("Hello    World").toEqual(expect.stringMatching(/hello\s+world/i));
    expect("HelloWorld").toEqual(expect.not.stringMatching(/hello\s+world/i));
  });

  test("length", () => {
    expect("Hello World").toHaveLength(11);
    expect("Hello World").not.toHaveLength(20);
  });
});

describe("Arrays", () => {
  test("exact match", () => {
    expect(["a", "b", "c"]).toEqual(["a", "b", "c"]);
    expect(["a", "b", "c"]).not.toEqual(["a"]);
  });

  test("partial match - primitive equality", () => {
    expect(["a", { b: true }, "c"]).toContain("a");
    expect(["a", { b: true }, "c"]).not.toContain("d");
  });

  test("partial match - deep equality", () => {
    // Deep equality check (.toContain will fail)
    expect(["a", { b: true }]).toContainEqual({ b: true });
    expect(["a", { b: true }, "c"]).toEqual(
      expect.arrayContaining(["a", { b: true }])
    );
  });

  test("length", () => {
    expect(["a", "b", "c"]).toHaveLength(3);
    expect(["a", "b", "c"]).not.toHaveLength(5);
  });
});

describe("Objects", () => {
  test("exact match", () => {
    expect({ a: true, b: 4, c: undefined }).toEqual({ a: true, b: 4 });
    expect({ a: true, b: 4, c: undefined }).not.toEqual({ a: true });

    expect({ a: true, b: 4, c: undefined }).toStrictEqual({
      a: true,
      b: 4,
      c: undefined,
    });
    expect({ a: true, b: 4, c: undefined }).not.toStrictEqual({
      a: false,
      b: 4,
      c: undefined,
    });
  });

  test("partial match", () => {
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
    expect(actual).toEqual(
      expect.objectContaining({
        a: true,
        // Struggles with nested structures, must have all keys
        c: { d: [1, 2, 3], e: expect.stringMatching(/hello|goodbye/) },
      })
    );
  });

  test("specific properties", () => {
    const houseForSale = {
      bedrooms: 4,
      kitchen: {
        amenities: ["oven", "stove", "washer"],
        area: 20,
      },
    };

    expect(houseForSale).toHaveProperty("bedrooms");
    expect(houseForSale).toHaveProperty("bedrooms", 4);
    expect(houseForSale).not.toHaveProperty("pool");

    expect(houseForSale).toHaveProperty("kitchen.area", 20);
    expect(houseForSale).toHaveProperty(["kitchen", "area"], 20);

    expect(houseForSale).toHaveProperty("kitchen.amenities", [
      "oven",
      "stove",
      "washer",
    ]);
    expect(houseForSale).toHaveProperty(["kitchen", "amenities", 0], "oven");
    expect(houseForSale).not.toHaveProperty(["kitchen", "open"]);
  });
});

describe("Flexible matchers", () => {
  test("anything", () => {
    expect({ a: "b" }).toEqual({ a: expect.anything() });
    expect(0).toEqual(expect.anything());
    expect(null).not.toEqual(expect.anything());
    expect(undefined).not.toEqual(expect.anything());
  });

  test("any", () => {
    expect({ a: "b" }).toEqual({ a: expect.any(String) });
  });
});

describe("Errors", () => {
  test("string", () => {
    const errorThrower = () => {
      throw new Error("Nope!");
    };
    expect(() => {
      errorThrower();
    }).toThrow("Nope!");
  });

  test("regex", () => {
    const errorThrower = () => {
      throw new Error("Nope!");
    };
    expect(() => {
      errorThrower();
    }).toThrow(/nope/i);
  });
});

describe("Mocks", () => {
  test("called once", () => {
    const item1 = { name: "a" };
    const mock = jest.fn((item) => item.name);
    mock(item1);

    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(item1);

    expect(mock).toHaveReturned();
    expect(mock).toHaveReturnedWith("a");
  });

  test("called multiple times", () => {
    const item1 = { name: "a" };
    const item2 = { name: "b" };
    const mock = jest.fn((item) => item.name);
    mock(item1);
    mock(item2);

    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenLastCalledWith(item2);
    expect(mock).toHaveBeenNthCalledWith(1, item1);
    expect(mock).toHaveBeenNthCalledWith(2, item2);

    expect(mock).toHaveReturnedTimes(2);
    expect(mock).toHaveLastReturnedWith("b");
    expect(mock).toHaveNthReturnedWith(1, "a");
    expect(mock).toHaveNthReturnedWith(2, "b");
  });
});

describe("Async", () => {
  test("resolve", async () => {
    await expect(Promise.resolve("a")).resolves.toBe("a");
  });

  test("reject", async () => {
    await expect(Promise.reject(new Error("Nope!"))).rejects.toThrow("Nope!");
  });
});

describe("Other", () => {
  test("toBeInstanceOf", () => {
    class A {}

    expect(new A()).toBeInstanceOf(A);
    expect(() => {}).toBeInstanceOf(Function);
    expect(new A()).not.toBeInstanceOf(Function);
  });

  expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      }
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    },
  });

  test("custom matchers", () => {
    expect(99).toBeWithinRange(0, 100);
    expect(101).not.toBeWithinRange(0, 100);
  });
});
