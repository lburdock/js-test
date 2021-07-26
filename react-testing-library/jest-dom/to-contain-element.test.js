import React from "react";
import { render, screen } from "@testing-library/react";

describe("toContainElement", () => {
  test("parent contains child", () => {
    render(
      <span data-testid="parent">
        <span data-testid="child">Hello</span>
      </span>
    );

    const parentEl = screen.getByTestId("parent");
    const childEl = screen.getByTestId("child");

    expect(parentEl).toContainElement(childEl);
  });
});

describe("not.toContainElement", () => {
  test("child doesn't contain parent", () => {
    render(
      <span data-testid="parent">
        <span data-testid="child">Hello</span>
      </span>
    );

    const parentEl = screen.getByTestId("parent");
    const childEl = screen.getByTestId("child");

    expect(childEl).not.toContainElement(parentEl);
  });

  test("unrelated element", () => {
    render(
      <>
        <span data-testid="parent">
          <span data-testid="child">Hello</span>
        </span>
        <span data-testid="unrelated">World</span>
      </>
    );

    const parentEl = screen.getByTestId("parent");
    const unrelatedEl = screen.getByTestId("unrelated");

    expect(parentEl).not.toContainElement(unrelatedEl);
  });
});
