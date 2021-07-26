import React from "react";
import { render, screen } from "@testing-library/react";

describe("toHaveAccessibleName", () => {
  test("link", () => {
    render(<a href="/">Start</a>);

    const el = screen.getByRole("link");

    expect(el).toHaveAccessibleName("Start");
  });

  test("link with label", () => {
    render(
      <a href="/" aria-label="Home page" title="A link to start over">
        Start
      </a>
    );

    const el = screen.getByRole("link");

    expect(el).toHaveAccessibleName();
    expect(el).toHaveAccessibleName("Home page");
    expect(el).not.toHaveAccessibleName("A link to start over");
  });

  test("input with title", () => {
    render(<input title="Example" />);

    const el = screen.getByRole("textbox");

    expect(el).toHaveAccessibleName("Example");
  });

  test("image with alt", () => {
    render(<img src="logo.jpg" alt="Company logo" />);

    const el = screen.getByRole("img");

    expect(el).toHaveAccessibleName("Company logo");
  });

  test("svg with title", () => {
    render(
      <svg data-testid="svg-id">
        <title>Company logo</title>
        <circle cx="50" cy="50" r="50" />
      </svg>
    );

    const el = screen.getByTestId("svg-id");

    expect(el).toHaveAccessibleName("Company logo");
  });

  test("img button with alt", () => {
    render(
      <button type="button">
        <img src="logo.jpg" alt="Company logo" />
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).toHaveAccessibleName("Company logo");
  });

  test("svg button with title", () => {
    render(
      <button type="button">
        <svg>
          <title>Company logo</title>
          <circle cx="50" cy="50" r="50" />
        </svg>
      </button>
    );

    const el = screen.getByRole("button");

    expect(el).toHaveAccessibleName("Company logo");
  });
});

describe("not.toHaveAccessibleName", () => {
  test("image with empty alt", () => {
    render(<img src="logo.jpg" alt="" />);

    const el = screen.getByRole("img");

    expect(el).not.toHaveAccessibleName();
  });

  test("svg without title", () => {
    render(
      <svg data-testid="svg-id">
        <circle cx="50" cy="50" r="50" />
      </svg>
    );

    const el = screen.getByTestId("svg-id");

    expect(el).not.toHaveAccessibleName();
  });
});
