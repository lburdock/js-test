import React from "react";
import { render, screen } from "@testing-library/react";

describe("toContainHTML (NOT RECOMMENDED)", () => {
  test("parent contains child", () => {
    render(
      <span data-testid="parent">
        <span data-testid="child">Hello</span>
      </span>
    );

    const parentEl = screen.getByTestId("parent");

    expect(parentEl).toContainHTML('<span data-testid="child">Hello</span>');
  });

  test("empty child", () => {
    render(
      <span data-testid="parent">
        <span data-testid="child" />
      </span>
    );

    const parentEl = screen.getByTestId("parent");

    expect(parentEl).toContainHTML('<span data-testid="child"></span>');
    expect(parentEl).toContainHTML('<span data-testid="child" />');
  });
});

describe("not.toContainHTML", () => {
  test("no br present", () => {
    render(
      <span data-testid="parent">
        <span data-testid="child">Hello</span>
      </span>
    );

    const parentEl = screen.getByTestId("parent");

    expect(parentEl).not.toContainHTML("<br />");
  });
});
