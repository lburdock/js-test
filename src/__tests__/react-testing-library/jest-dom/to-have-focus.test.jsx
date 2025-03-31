import { render, screen } from "@testing-library/react";

describe("toHaveFocus", () => {
  test("input", () => {
    render(<input type="text" />);

    const el = screen.getByRole("textbox");

    el.focus();
    expect(el).toHaveFocus();

    el.blur();
    expect(el).not.toHaveFocus();
  });
});
