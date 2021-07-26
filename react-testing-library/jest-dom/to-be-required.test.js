import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeRequired", () => {
  test("text input", () => {
    render(<input required />);

    const el = screen.getByRole("textbox");

    expect(el).toBeRequired();
  });

  test("text input aria required", () => {
    render(<input aria-required="true" />);

    const el = screen.getByRole("textbox");

    expect(el).toBeRequired();
  });

  test("text input - conflicting required status", () => {
    render(<input required aria-required="false" />);

    const el = screen.getByRole("textbox");

    expect(el).toBeRequired();
  });

  test("select", () => {
    render(
      <select required>
        <option value="1">Example 1</option>
        <option value="2">Example 2</option>
      </select>
    );

    const el = screen.getByRole("combobox");

    expect(el).toBeRequired();
  });

  test("textarea", () => {
    render(<textarea required />);

    const el = screen.getByRole("textbox");

    expect(el).toBeRequired();
  });

  test("supported role - aria", () => {
    render(<div role="tree" aria-required="true" />);

    const el = screen.getByRole("tree");

    expect(el).toBeRequired();
  });
});

describe("not.toBeRequired", () => {
  test("text input", () => {
    render(<input />);

    const el = screen.getByRole("textbox");

    expect(el).not.toBeRequired();
  });

  test("text input - aria-required false", () => {
    render(<input aria-required="false" />);

    const el = screen.getByRole("textbox");

    expect(el).not.toBeRequired();
  });

  test("unsupported attribute for role", () => {
    render(<input type="image" required />);

    const el = screen.getByRole("button");

    expect(el).not.toBeRequired();
  });

  test("supported role - unsupported attribute", () => {
    render(<div role="tree" required />);

    const el = screen.getByRole("tree");

    expect(el).not.toBeRequired();
  });
});
