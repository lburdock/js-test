import React from "react";
import { render, screen } from "@testing-library/react";

// TODO: Add more element examples
describe("toBeDisabled", () => {
  test("disabled button", () => {
    render(
      <button disabled type="button">
        Save
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).toBeDisabled();
  });
});
