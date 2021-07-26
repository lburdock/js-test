describe("Mock calls", () => {
  test("mock.calls", () => {
    const mockFn = jest.fn();
    mockFn("a", "b");
    mockFn("c");

    expect(mockFn.mock.calls).toHaveLength(2);
    expect(mockFn.mock.calls).toEqual([["a", "b"], ["c"]]);
    expect(mockFn.mock.calls[0][1]).toEqual("b");
  });
});

describe("Mocking implementation", () => {
  test("static", () => {
    const mockFn = jest.fn((arg) => arg);

    expect(mockFn(0)).toEqual(0);
    expect(mockFn(2)).toEqual(2);
  });

  test("dynamic", () => {
    const mockFn = jest
      .fn(() => "default")
      .mockImplementationOnce(() => "Call 1")
      .mockImplementationOnce(() => "Call 2");

    expect(mockFn()).toEqual("Call 1");
    expect(mockFn()).toEqual("Call 2");
    expect(mockFn()).toEqual("default");
    expect(mockFn()).toEqual("default");
  });
});

describe("Mocking return value", () => {
  test("static", () => {
    const mockFn = jest.fn();

    mockFn.mockReturnValue(0);
    expect(mockFn()).toEqual(0);
    expect(mockFn()).toEqual(0);

    mockFn.mockReturnValue(2);
    expect(mockFn()).toEqual(2);
  });

  test("dynamic", () => {
    const mockFn = jest
      .fn()
      .mockReturnValue("default")
      .mockReturnValueOnce("Call 1")
      .mockReturnValueOnce("Call 2");

    expect(mockFn()).toEqual("Call 1");
    expect(mockFn()).toEqual("Call 2");
    expect(mockFn()).toEqual("default");
    expect(mockFn()).toEqual("default");
  });
});

describe("Mocking async implementation", () => {
  test("resolve", async () => {
    const mockFn = jest.fn((arg) => Promise.resolve(arg));
    await expect(mockFn(0)).resolves.toEqual(0);

    const result = await mockFn(2);
    expect(result).toEqual(2);
  });

  test("reject", async () => {
    const mockFn = jest.fn(() => Promise.reject(new Error("Error 1")));

    await expect(mockFn()).rejects.toThrow("Error 1");
  });
});

describe("Mocking async return value", () => {
  test("static resolve value", async () => {
    const mockFn = jest.fn();

    mockFn.mockResolvedValue(0);
    await expect(mockFn()).resolves.toEqual(0);
    await expect(mockFn()).resolves.toEqual(0);

    mockFn.mockResolvedValue(2);
    await expect(mockFn()).resolves.toEqual(2);
  });

  test("dynamic resolve value", async () => {
    const mockFn = jest
      .fn()
      .mockResolvedValue("default")
      .mockResolvedValueOnce("Call 1")
      .mockResolvedValueOnce("Call 2");

    await expect(mockFn()).resolves.toEqual("Call 1");
    await expect(mockFn()).resolves.toEqual("Call 2");
    await expect(mockFn()).resolves.toEqual("default");
    await expect(mockFn()).resolves.toEqual("default");
  });

  test("static reject value", async () => {
    const mockFn = jest.fn();

    mockFn.mockRejectedValue(new Error("Error 1"));
    await expect(mockFn()).rejects.toThrow("Error 1");
    await expect(mockFn()).rejects.toThrow("Error 1");

    mockFn.mockRejectedValue(new Error("Error 2"));
    await expect(mockFn()).rejects.toThrow("Error 2");
  });

  test("dynamic resolve/reject value", async () => {
    const mockFn = jest
      .fn()
      .mockRejectedValue(new Error("default error"))
      .mockResolvedValueOnce("Call 1")
      .mockRejectedValueOnce(new Error("Error 1"));

    await expect(mockFn()).resolves.toEqual("Call 1");
    await expect(mockFn()).rejects.toThrow("Error 1");
    await expect(mockFn()).rejects.toThrow("default error");
    await expect(mockFn()).rejects.toThrow("default error");
  });
});
