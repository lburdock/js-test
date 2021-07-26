import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeChecked", () => {
  test.each([
    {
      Component: <input type="checkbox" defaultChecked />,
      role: "checkbox",
    },
    {
      Component: <input type="radio" value="a" defaultChecked />,
      role: "radio",
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
  ])("$role", ({ Component, role }) => {
    render(Component);

    const el = screen.getByRole(role);

    expect(el).toBeChecked();
  });
});

describe("not.toBeChecked", () => {
  test.each([
    {
      Component: <input type="checkbox" />,
      role: "checkbox",
    },
    {
      Component: <input type="radio" value="a" />,
      role: "radio",
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

    expect(el).not.toBeChecked();
  });
});
