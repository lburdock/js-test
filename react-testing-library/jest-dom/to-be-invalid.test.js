import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeInvalid", () => {
  test("text input", () => {
    render(<input type="text" aria-invalid />);

    const el = screen.getByRole("textbox");

    expect(el).toBeInvalid();
  });

  test("text input aria", () => {
    render(<input aria-invalid="true" />);

    const el = screen.getByRole("textbox");

    expect(el).toBeInvalid();
  });

  test("form with required input", () => {
    render(
      <form aria-label="Info">
        <input required />
      </form>
    );

    const el = screen.getByRole("form");

    expect(el).toBeInvalid();
  });
});
