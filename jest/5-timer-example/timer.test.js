import timer from "./timer";

jest.useFakeTimers();

// https://github.com/facebook/jest/blob/master/packages/jest-fake-timers/src/modernFakeTimers.ts
describe("Faking timers", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test("calls the callback", () => {
    const callback = jest.fn();
    timer(callback);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toHaveBeenCalled();

    // Fast-forward until all timers have been executed
    jest.runAllTimers();

    // Now our callback should have been called!
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
