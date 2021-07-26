import React from "react";
import { render, screen } from "@testing-library/react";

describe("toHaveAttribute", () => {
  test("attributes", () => {
    render(
      <button type="submit" disabled>
        Example
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).toHaveAttribute("disabled");
    expect(el).toHaveAttribute("type", "submit");
  });
});

describe("not.toHaveAttribute", () => {
  test("attributes", () => {
    render(
      <button type="submit" disabled>
        Example
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).not.toHaveAttribute("type", "button");
  });
});
