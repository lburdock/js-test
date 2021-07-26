import React from "react";
import { render, screen } from "@testing-library/react";

// toHaveDisplayValue(value: string | RegExp | (string|RegExp)[])
describe("toHaveDisplayValue", () => {
  test("text input", () => {
    render(<input type="text" defaultValue="Example" />);

    const el = screen.getByRole("textbox");

    expect(el).toHaveDisplayValue("Example");
    expect(el).toHaveDisplayValue(/ex/i);
  });

  test("number", () => {
    render(<input type="number" defaultValue="5" />);

    const el = screen.getByRole("spinbutton");

    expect(el).toHaveDisplayValue("5");
  });

  test("textarea", () => {
    render(<textarea defaultValue="Example" />);

    const el = screen.getByRole("textbox");

    expect(el).toHaveDisplayValue("Example");
    expect(el).toHaveDisplayValue(/ex/i);
  });

  test("single select", () => {
    render(
      <select defaultValue="2">
        <option value="1">Example 1</option>
        <option value="2">Example 2</option>
      </select>
    );

    const el = screen.getByRole("combobox");
    expect(el).toHaveDisplayValue("Example 2");
    expect(el).toHaveDisplayValue(/2/);
  });

  test("multiple select", () => {
    render(
      <select multiple defaultValue={["1", "2"]}>
        <option value="1">Example 1</option>
        <option value="2">Example 2</option>
      </select>
    );

    const el = screen.getByRole("listbox");
    expect(el).toHaveDisplayValue(["Example 1", /2/]);
  });
});
