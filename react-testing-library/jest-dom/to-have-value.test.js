import React from "react";
import { render, screen } from "@testing-library/react";

// toHaveValue(value: string | string[] | number)
describe("toHaveValue", () => {
  test("text input", () => {
    render(<input type="text" defaultValue="Example" />);

    const el = screen.getByRole("textbox");

    expect(el).toHaveValue("Example");
  });

  test("number", () => {
    render(<input type="number" defaultValue="5" />);

    const el = screen.getByRole("spinbutton");

    expect(el).toHaveValue(5);
  });

  test("textarea", () => {
    render(<textarea defaultValue="Example" />);

    const el = screen.getByRole("textbox");

    expect(el).toHaveValue("Example");
  });

  test("single select", () => {
    render(
      <select defaultValue="2">
        <option value="1">Example 1</option>
        <option value="2">Example 2</option>
      </select>
    );

    const el = screen.getByRole("combobox");
    expect(el).toHaveValue("2");
  });

  test("multiple select", () => {
    render(
      <select multiple defaultValue={["1", "2"]}>
        <option value="1">Example 1</option>
        <option value="2">Example 2</option>
      </select>
    );

    const el = screen.getByRole("listbox");
    expect(el).toHaveValue(["1", "2"]);
  });
});
