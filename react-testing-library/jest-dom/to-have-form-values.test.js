import React from "react";
import { render, screen } from "@testing-library/react";

// TODO: add more input types
describe("toHaveFormValues", () => {
  test("form values", () => {
    render(
      <form data-testid="login-form">
        <input type="text" name="username" defaultValue="jane.doe" />
        <input type="password" name="password" defaultValue="12345678" />
        <input type="checkbox" name="rememberMe" defaultChecked />
        <button type="submit">Sign in</button>
      </form>
    );

    expect(screen.getByTestId("login-form")).toHaveFormValues({
      username: "jane.doe",
      rememberMe: true,
    });
  });
});
