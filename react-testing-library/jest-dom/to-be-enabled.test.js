import React from "react";
import { render, screen } from "@testing-library/react";

// TODO: Add more element examples
describe("toBeEnabled", () => {
  test("button", () => {
    render(<button type="button">Save</button>);

    const el = screen.getByRole("button");

    expect(el).toBeEnabled();
  });
});
