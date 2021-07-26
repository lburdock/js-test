import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBePartiallyChecked", () => {
  test("checkbox input", () => {
    render(<input type="checkbox" aria-checked="mixed" />);

    const el = screen.getByRole("checkbox");

    expect(el).toBePartiallyChecked();
  });

  test("checkbox div", () => {
    render(<div role="checkbox" aria-checked="mixed" />);

    const el = screen.getByRole("checkbox");

    expect(el).toBePartiallyChecked();
  });

  test("indeterminate set to true", () => {
    render(<input type="checkbox" />);

    const el = screen.getByRole("checkbox");
    el.indeterminate = true;

    expect(el).toBePartiallyChecked();
  });
});

describe("not.toBePartiallyChecked", () => {
  test.each([
    {
      Component: <input type="checkbox" defaultChecked />,
      role: "checkbox",
    },
    {
      Component: <div role="checkbox" aria-checked="true" />,
      role: "checkbox",
    },
    {
      Component: <div role="radio" aria-checked="true" />,
      role: "radio",
    },
    {
      Component: <div role="switch" aria-checked="true" />,
      role: "switch",
    },
    {
      Component: <input type="checkbox" />,
      role: "checkbox",
    },
    {
      Component: <div role="checkbox" aria-checked="false" />,
      role: "checkbox",
    },
    {
      Component: <div role="radio" aria-checked="false" />,
      role: "radio",
    },
    {
      Component: <div role="switch" aria-checked="false" />,
      role: "switch",
    },
  ])("$role", ({ Component, role }) => {
    render(Component);

    const el = screen.getByRole(role);

    expect(el).not.toBePartiallyChecked();
  });
});
