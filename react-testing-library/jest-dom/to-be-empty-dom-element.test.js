import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeEmptyDOMElement", () => {
  test("null", () => {
    render(<h1>{null}</h1>);

    const el = screen.getByRole("heading");

    expect(el).toBeEmptyDOMElement();
  });

  test("empty", () => {
    render(<div data-testid="empty" />);

    const el = screen.getByTestId("empty");

    expect(el).toBeEmptyDOMElement();
  });
});

describe("not.toBeEmptyDOMElement", () => {
  test("with text", () => {
    render(<h1>Example</h1>);

    const el = screen.getByRole("heading");

    expect(el).not.toBeEmptyDOMElement();
  });

  test("whitespace", () => {
    render(<h1> </h1>);

    const el = screen.getByRole("heading");

    expect(el).not.toBeEmptyDOMElement();
  });
});
