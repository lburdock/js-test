import { render, screen } from "@testing-library/react";
import { TestComponent } from "./to-contain-element.test";

describe("NOT RECOMMENDED: toContainHTML matcher", () => {
  describe("toContainHTML", () => {
    test("parent contains child", () => {
      render(<TestComponent>Hello</TestComponent>);

      const parentEl = screen.getByTestId("parent");

      expect(parentEl).toContainHTML('<span data-testid="child">Hello</span>');
    });

    test("empty child", () => {
      render(<TestComponent />);

      const parentEl = screen.getByTestId("parent");

      expect(parentEl).toContainHTML('<span data-testid="child"></span>');
      expect(parentEl).toContainHTML('<span data-testid="child" />');
    });
  });

  describe("not.toContainHTML", () => {
    test("no br present", () => {
      render(<TestComponent>Hello</TestComponent>);

      const parentEl = screen.getByTestId("parent");

      expect(parentEl).not.toContainHTML("<br />");
    });
  });
});
