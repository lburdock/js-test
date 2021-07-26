import React from "react";
import { render, screen } from "@testing-library/react";

describe("toHaveStyle", () => {
  test("styles", () => {
    render(
      <button type="button" style={{ display: "flex", backgroundColor: "red" }}>
        Delete item
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle({ display: "flex" });
    expect(el).toHaveStyle({
      backgroundColor: "red",
      display: "flex",
    });
    expect(el).toHaveStyle(`
  background-color: red;
  display: flex;
`);
  });
});

describe("not.toHaveStyle", () => {
  test("styles", () => {
    render(
      <button type="button" style={{ display: "flex", backgroundColor: "red" }}>
        Delete item
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).not.toHaveStyle({
      backgroundColor: "blue",
      display: "flex",
    });
    expect(el).not.toHaveStyle(`
  background-color: blue;
  display: flex;
`);
  });
});
