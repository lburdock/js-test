import React from "react";
import { render, screen } from "@testing-library/react";

describe("toHaveAccessibleDescription", () => {
  test("link with title", () => {
    render(
      <a href="/" aria-label="Home page" title="A link to start over">
        Start
      </a>
    );

    const el = screen.getByRole("link");

    expect(el).toHaveAccessibleDescription();
    expect(el).toHaveAccessibleDescription("A link to start over");
    expect(el).not.toHaveAccessibleDescription("Home page");
  });

  test("image with description", () => {
    render(
      <>
        <img src="logo.jpg" alt="Company logo" aria-describedby="t1" />
        <span id="t1" role="presentation">
          The logo of Our Company
        </span>
      </>
    );

    const el = screen.getByRole("img");

    expect(el).toHaveAccessibleDescription();
    expect(el).toHaveAccessibleDescription("The logo of Our Company");
    expect(el).not.toHaveAccessibleDescription("Company logo");
  });
});

describe("not.toHaveAccessibleDescription", () => {
  test("link without title", () => {
    render(
      <a href="/" aria-label="Home page">
        Start
      </a>
    );

    const el = screen.getByRole("link");

    expect(el).not.toHaveAccessibleDescription();
  });

  test("image without description", () => {
    render(<img src="avatar.jpg" alt="Profile pic" />);

    const el = screen.getByRole("img");

    expect(el).not.toHaveAccessibleDescription();
  });
});
