import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeValid", () => {
  test("text input", () => {
    render(<input type="text" />);

    const el = screen.getByRole("textbox");

    expect(el).toBeValid();
  });

  test("text input aria", () => {
    render(<input aria-invalid="false" />);

    const el = screen.getByRole("textbox");

    expect(el).toBeValid();
  });

  test("form", () => {
    render(
      <form aria-label="Info">
        <input />
      </form>
    );

    const el = screen.getByRole("form");

    expect(el).toBeValid();
  });

  test("form with required input", () => {
    render(
      <form aria-label="Info">
        <input required defaultValue="Hello" />
      </form>
    );

    const el = screen.getByRole("form");

    expect(el).toBeValid();
  });
});
