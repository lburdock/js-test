import { render, screen } from "@testing-library/react";

const TestComponent = () => (
  <button type="button" style={{ display: "flex", backgroundColor: "black" }}>
    Delete item
  </button>
);

describe("toHaveStyle", () => {
  test("styles", () => {
    render(<TestComponent />);

    const el = screen.getByRole("button");

    expect(el).toHaveStyle("display: flex");
    expect(el).toHaveStyle({ display: "flex" });
    expect(el).toHaveStyle({
      display: "flex",
      backgroundColor: "rgb(0, 0, 0)", // Expects color as rgb string
    });
    expect(el).toHaveStyle(`
      background-color: rgb(0, 0, 0);
      display: flex;
    `);
  });
});

describe("not.toHaveStyle", () => {
  test("styles", () => {
    render(<TestComponent />);

    const el = screen.getByRole("button");

    expect(el).not.toHaveStyle({ display: "block" });
    expect(el).not.toHaveStyle({
      backgroundColor: "rgb(0, 0, 255)",
      display: "flex",
    });
    expect(el).not.toHaveStyle(`
      background-color: rgb(0, 0, 255);
      display: flex;
    `);
  });
});
