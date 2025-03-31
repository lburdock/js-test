describe("Flexible matchers", () => {
  test("`expect.anything`", () => {
    expect({ id: "abc" }).toStrictEqual({ id: expect.anything() });
    expect(0).toStrictEqual(expect.anything());
    expect(null).not.toStrictEqual(expect.anything());
    expect(undefined).not.toStrictEqual(expect.anything());
  });

  test("`expect.any`", () => {
    expect({ id: "abc" }).toStrictEqual({ id: expect.any(String) });
    expect({ total: 10 }).toStrictEqual({ total: expect.any(Number) });
    expect({ active: false }).toStrictEqual({ active: expect.any(Boolean) });
  });

  test("`expect.closeTo`", () => {
    expect({ sum: 0.1 + 0.2 }).toStrictEqual({ sum: expect.closeTo(0.3, 5) });
  });

  test("`expect.stringContaining`", () => {
    expect({ name: "Empire" }).toStrictEqual({
      name: expect.stringContaining("Emp"),
    });
  });

  test("`expect.stringMatching`", () => {
    expect({ name: "Empire" }).toStrictEqual({
      name: expect.stringMatching(/re$/),
    });
  });

  test("`expect.arrayContaining`", () => {
    expect({ options: ["Fuji", "Gala"] }).toStrictEqual({
      options: expect.arrayContaining(["Gala"]),
    });
  });

  test("`expect.objectContaining`", () => {
    expect({ count: { Fuji: 1, Gala: 2 } }).toStrictEqual({
      count: expect.objectContaining({ Fuji: 1 }),
    });
  });
});

describe("Errors", () => {
  test("`toThrowError` - string", () => {
    const errorThrower = () => {
      throw new Error("Nope!");
    };
    expect(() => {
      errorThrower();
    }).toThrowError("Nope!");
  });

  test("`toThrowError` - regex", () => {
    const errorThrower = () => {
      throw new Error("Nope!");
    };
    expect(() => {
      errorThrower();
    }).toThrowError(/nope/i);
  });
});

describe("Async", () => {
  test("`resolves`", async () => {
    const yarp = () => Promise.resolve("Yarp!");
    await expect(yarp()).resolves.toBe("Yarp!");
  });

  test("`rejects`", async () => {
    const narp = () => Promise.reject(new Error("Narp!"));
    await expect(narp()).rejects.toThrow("Narp!");
  });
});

// toBeTypeOf
// toSatisfy
// snapshots
describe("Other", () => {
  test("toBeInstanceOf", () => {
    class A {}

    expect(new A()).toBeInstanceOf(A);
    expect(() => {}).toBeInstanceOf(Function);
    expect(new A()).not.toBeInstanceOf(Function);
  });
});

describe("Custom matcher: `toBeWithinRange`", () => {
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

  test("`toBeWithinRange`", () => {
    expect(99).toBeWithinRange(0, 100);
    expect(101).not.toBeWithinRange(0, 100);
  });
});
