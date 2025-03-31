import { render, screen } from "@testing-library/react";

describe("toHaveClass", () => {
  test("element with classes", () => {
    render(<h1 className="btn extra btn-danger">Example</h1>);

    const el = screen.getByRole("heading");

    expect(el).toHaveClass("extra");
    expect(el).toHaveClass("btn-danger btn");
    expect(el).toHaveClass("btn-danger", "btn");
    expect(el).toHaveClass(/danger/, "btn");

    // to check if the element has EXACTLY a set of classes
    expect(el).toHaveClass("btn-danger extra btn", { exact: true });
  });
});

describe("not.toHaveClass", () => {
  test("element with classes", () => {
    render(<h1 className="btn extra btn-danger">Example</h1>);

    const el = screen.getByRole("heading");

    expect(el).not.toHaveClass("btn-link");

    // if it has more than expected it is going to fail
    expect(el).not.toHaveClass("btn-danger extra", { exact: true });
  });

  test("element without classes", () => {
    render(<h1>Example</h1>);

    const el = screen.getByRole("heading");

    expect(el).not.toHaveClass();
  });
});
