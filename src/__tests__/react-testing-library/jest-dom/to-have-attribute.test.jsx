import { render, screen } from "@testing-library/react";

const TestComponent = () => (
  <button type="submit" disabled>
    Example
  </button>
);

describe("toHaveAttribute", () => {
  test("type === submit", () => {
    render(<TestComponent />);

    const el = screen.getByRole("button");

    expect(el).toHaveAttribute("type", "submit");
    expect(el).toHaveAttribute("type", expect.stringContaining("sub"));
  });
});

describe("not.toHaveAttribute", () => {
  test("type === button", () => {
    render(<TestComponent />);

    const el = screen.getByRole("button");

    expect(el).not.toHaveAttribute("type", "button");
    expect(el).toHaveAttribute("type", expect.not.stringContaining("but"));
  });
});
