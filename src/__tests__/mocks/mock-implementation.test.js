describe("Mocking implementation", () => {
  test("`vi.fn`", () => {
    const mock = vi.fn(n => n * n);

    expect(mock(1)).toBe(1);
    expect(mock(2)).toBe(4);
  });

  test("`mockImplementationOnce``", () => {
    const mock = vi
      .fn(n => `Square: ${n * n}`)
      .mockImplementationOnce(n => `Cube: ${n * n * n}`);

    expect(mock(2)).toBe("Cube: 8");
    expect(mock(2)).toBe("Square: 4");
    expect(mock(2)).toBe("Square: 4");
  });
});

describe("Mocking sync return value", () => {
  test("`mockReturnValue`", () => {
    const mock = vi.fn();

    mock.mockReturnValue("Value 1");
    expect(mock()).toBe("Value 1");
    expect(mock()).toBe("Value 1");

    mock.mockReturnValue("Value 2");
    expect(mock()).toBe("Value 2");
  });

  test("`mockReturnValueOnce`", () => {
    const mock = vi
      .fn()
      .mockReturnValue("default")
      .mockReturnValueOnce("Value 1")
      .mockReturnValueOnce("Value 2");

    expect(mock()).toBe("Value 1");
    expect(mock()).toBe("Value 2");
    expect(mock()).toBe("default");
    expect(mock()).toBe("default");
  });
});

describe("Mocking async implementation", () => {
  test("resolve", async () => {
    const mock = vi.fn(arg => Promise.resolve(arg));
    await expect(mock(0)).resolves.toBe(0);

    const result = await mock(2);
    expect(result).toBe(2);
  });

  test("reject", async () => {
    const mock = vi.fn(() => Promise.reject(new Error("Error 1")));

    await expect(mock()).rejects.toThrow("Error 1");
  });
});

describe("Mocking async return value", () => {
  test("`mockResolvedValue`", async () => {
    const mock = vi.fn();

    mock.mockResolvedValue(0);
    await expect(mock()).resolves.toBe(0);
    await expect(mock()).resolves.toBe(0);

    mock.mockResolvedValue(2);
    await expect(mock()).resolves.toBe(2);
  });

  test("`mockResolvedValueOnce`", async () => {
    const mock = vi
      .fn()
      .mockResolvedValue("default")
      .mockResolvedValueOnce("Value 1")
      .mockResolvedValueOnce("Value 2");

    await expect(mock()).resolves.toBe("Value 1");
    await expect(mock()).resolves.toBe("Value 2");
    await expect(mock()).resolves.toBe("default");
    await expect(mock()).resolves.toBe("default");
  });

  test("`mockRejectedValue`", async () => {
    const mock = vi.fn();

    mock.mockRejectedValue(new Error("Error 1"));
    await expect(mock()).rejects.toThrow("Error 1");
    await expect(mock()).rejects.toThrow("Error 1");

    mock.mockRejectedValue(new Error("Error 2"));
    await expect(mock()).rejects.toThrow("Error 2");
  });

  test("`mockRejectedValueOnce`", async () => {
    const mock = vi
      .fn()
      .mockRejectedValue(new Error("default error"))
      .mockResolvedValueOnce("Value 1")
      .mockRejectedValueOnce(new Error("Error 1"));

    await expect(mock()).resolves.toBe("Value 1");
    await expect(mock()).rejects.toThrow("Error 1");
    await expect(mock()).rejects.toThrow("default error");
    await expect(mock()).rejects.toThrow("default error");
  });
});
