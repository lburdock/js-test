describe("Mocks", () => {
  describe("Called (sync or async)", () => {
    const item1 = { name: "a" };
    const item2 = { name: "b" };
    const mock = vi.fn(item => item.name);

    afterEach(() => {
      mock.mockClear();
    });

    describe("called once", () => {
      beforeEach(() => {
        mock(item1);
      });

      test("`toHaveBeenCalled``", () => {
        expect(mock).toHaveBeenCalled();
      });

      test("`toHaveBeenCalledWith`", () => {
        expect(mock).toHaveBeenCalledWith(item1);
      });
    });

    describe("called twice", () => {
      beforeEach(() => {
        mock(item1);
        mock(item2);
      });

      test("`toHaveBeenCalledTimes``", () => {
        expect(mock).toHaveBeenCalledTimes(2);
      });

      test("`toHaveBeenLastCalledWith`", () => {
        expect(mock).toHaveBeenLastCalledWith(item2);
      });

      test("`toHaveBeenNthCalledWith` - 1", () => {
        expect(mock).toHaveBeenNthCalledWith(1, item1);
      });

      test("`toHaveBeenNthCalledWith` - 2", () => {
        expect(mock).toHaveBeenNthCalledWith(2, item2);
      });
    });
  });

  describe("Mock call arguments", () => {
    test("mock.calls", () => {
      const mock = vi.fn();
      mock("a");
      mock("b");
      mock("c", "d");

      expect(mock.mock.calls).toHaveLength(3);
      expect(mock.mock.calls).toStrictEqual([["a"], ["b"], ["c", "d"]]);
      expect(mock.mock.calls[1][0]).toBe("b");
      expect(mock.mock.calls[2][1]).toBe("d");
      expect(mock.mock.lastCall).toStrictEqual(["c", "d"]);
    });
  });

  describe("Returned (sync)", () => {
    const item1 = { name: "a" };
    const item2 = { name: "b" };
    const mock = vi.fn(item => item.name);

    afterEach(() => {
      mock.mockClear();
    });

    describe("called once", () => {
      beforeEach(() => {
        mock(item1);
      });

      test("`toHaveReturned`", () => {
        expect(mock).toHaveReturned();
      });

      test("`toHaveReturnedWith`", () => {
        expect(mock).toHaveReturnedWith("a");
      });
    });

    describe("called twice", () => {
      beforeEach(() => {
        mock(item1);
        mock(item2);
      });

      test("`toHaveReturnedTimes`", () => {
        expect(mock).toHaveReturnedTimes(2);
      });

      test("`toHaveLastReturnedWith`", () => {
        expect(mock).toHaveLastReturnedWith("b");
      });

      test("`toHaveNthReturnedWith` - 1", () => {
        expect(mock).toHaveNthReturnedWith(1, "a");
      });

      test("`toHaveNthReturnedWith` - 2", () => {
        expect(mock).toHaveNthReturnedWith(2, "b");
      });
    });
  });

  describe("Resolved (async)", () => {
    const item1 = { name: "a" };
    const item2 = { name: "b" };
    const mock = vi.fn(item => Promise.resolve(item.name));

    afterEach(() => {
      mock.mockClear();
    });

    describe("called once", () => {
      beforeEach(async () => {
        await mock(item1);
      });

      test("`toHaveResolved`", () => {
        expect(mock).toHaveResolved();
      });

      test("`toHaveResolvedWith`", () => {
        expect(mock).toHaveResolvedWith("a");
      });
    });

    describe("called twice", () => {
      beforeEach(async () => {
        await mock(item1);
        await mock(item2);
      });

      test("`toHaveResolvedTimes`", () => {
        expect(mock).toHaveResolvedTimes(2);
      });

      test("`toHaveLastResolvedWith`", () => {
        expect(mock).toHaveLastResolvedWith("b");
      });

      test("`toHaveNthResolvedWith` - 1", () => {
        expect(mock).toHaveNthResolvedWith(1, "a");
      });

      test("`toHaveNthResolvedWith` - 2", () => {
        expect(mock).toHaveNthResolvedWith(2, "b");
      });
    });
  });
});
