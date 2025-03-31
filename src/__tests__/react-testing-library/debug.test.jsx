import { render, screen } from "@testing-library/react";

describe("Debugging", () => {
  test("debug", () => {
    render(
      <>
        <button type="button">test</button>
        <span>multi-test</span>
        <div>multi-test</div>
      </>,
    );

    // debug document
    screen.debug();
    // debug single element
    screen.debug(screen.getByText("test"));
    // debug multiple elements
    screen.debug(screen.getAllByText("multi-test"));

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  test("testing playground", () => {
    render(
      <>
        <button type="button">test</button>
        <span>multi-test</span>
        <div>multi-test</div>
      </>,
    );

    // log entire document to testing-playground
    screen.logTestingPlaygroundURL();

    // log a single element
    screen.logTestingPlaygroundURL(screen.getByText("test"));

    expect(screen.getByText("test")).toBeInTheDocument();
  });
});
