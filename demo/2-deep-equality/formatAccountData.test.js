import formatAccountData from "./formatAccountData";

describe("formatAccountData", () => {
  test("returns null if account is missing", () => {
    const account = undefined;
    const expected = null;
    expect(formatAccountData(account)).toBe(expected);
  });

  test("false when the role is student", () => {
    const account = { role: "student" };
    const expected = { role: "student", isTaUp: false };
    expect(formatAccountData(account)).toStrictEqual(expected);
  });

  test.each([{ role: "ta" }, { role: "teacher" }, { role: "admin" }])(
    "true when the role is $role",
    ({ role }) => {
      const account = { role };
      const expected = { role, isTaUp: true };
      expect(formatAccountData(account)).toStrictEqual(expected);
    }
  );
});
