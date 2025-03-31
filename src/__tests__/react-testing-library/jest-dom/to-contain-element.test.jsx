import { render, screen } from "@testing-library/react";

export const TestComponent = ({ children }) => (
  <span data-testid="parent">
    <span data-testid="child">{children}</span>
  </span>
);

describe("toContainElement", () => {
  test("parent contains child", () => {
    render(<TestComponent>Hello</TestComponent>);

    const parentEl = screen.getByTestId("parent");
    const childEl = screen.getByTestId("child");

    expect(parentEl).toContainElement(childEl);
  });
});

describe("not.toContainElement", () => {
  test("child doesn't contain parent", () => {
    render(<TestComponent>Hello</TestComponent>);

    const parentEl = screen.getByTestId("parent");
    const childEl = screen.getByTestId("child");

    expect(childEl).not.toContainElement(parentEl);
  });

  test("unrelated element", () => {
    render(
      <>
        <TestComponent>Hello</TestComponent>
        <span data-testid="unrelated">World</span>
      </>
    );

    const parentEl = screen.getByTestId("parent");
    const unrelatedEl = screen.getByTestId("unrelated");

    expect(parentEl).not.toContainElement(unrelatedEl);
  });
});
