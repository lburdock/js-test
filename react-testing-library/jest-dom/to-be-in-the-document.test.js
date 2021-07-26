import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeInTheDocument", () => {
  test("button", () => {
    render(<button type="button">Save</button>);

    const el = screen.getByRole("button");

    expect(el).toBeInTheDocument();
  });
});

describe("not.toBeInTheDocument", () => {
  test("heading not present", () => {
    render(<button type="button">Save</button>);

    // Use `queryBy` so it doesn't throw an error when it can't find the element
    const el = screen.queryByRole("heading");

    expect(el).not.toBeInTheDocument();
  });

  test("hidden button", () => {
    render(
      <button type="button" style={{ display: "none" }}>
        Save
      </button>
    );

    const el = screen.queryByRole("button");

    expect(el).not.toBeInTheDocument();
  });
});
