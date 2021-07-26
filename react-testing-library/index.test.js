import React from "react";
import { render, screen } from "@testing-library/react";

describe("Text match", () => {
  test("exact match", () => {
    render(<div>Hello World</div>);

    expect(screen.getByText("Hello World"));
  });

  test("partial match", () => {
    render(<div>Hello World</div>);
    // This will throw an error because it doesn't exactly match the text
    expect(() => {
      screen.getByText("llo Worl");
    }).toThrow();

    // Matching a regex
    expect(screen.getByText(/world/i));

    // Include { exact: false } for partial matches
    expect(screen.getByText("llo Worl", { exact: false }));
    expect(screen.getByText("hello world", { exact: false }));

    // Matching with a custom function
    expect(
      screen.getByText(
        (content, element) =>
          element.tagName.toLowerCase() === "div" && content.startsWith("Hello")
      )
    );
  });
});

describe.skip("Debugging", () => {
  test("debug", () => {
    render(
      <>
        <button type="button">test</button>
        <span>multi-test</span>
        <div>multi-test</div>
      </>
    );

    // debug document
    screen.debug();
    // debug single element
    screen.debug(screen.getByText("test"));
    // debug multiple elements
    screen.debug(screen.getAllByText("multi-test"));
  });

  test("testing playground", () => {
    render(
      <>
        <button type="button">test</button>
        <span>multi-test</span>
        <div>multi-test</div>
      </>
    );

    // log entire document to testing-playground
    screen.logTestingPlaygroundURL();

    // log a single element
    screen.logTestingPlaygroundURL(screen.getByText("test"));
  });
});

describe("Manual queries", () => {
  test("works", () => {
    const { container } = render(<div data-foo="bar">Hello World</div>);
    const foo = container.querySelector('[data-foo="bar"]');
    expect(foo).toBeInTheDocument();
  });
});
