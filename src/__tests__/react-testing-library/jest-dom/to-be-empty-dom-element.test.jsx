import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

export const EMPTY_COMPONENTS = formatComponentTests([
  <div data-testid={TID}>{null}</div>,
  <div data-testid={TID} />,
]);

describe("toBeEmptyDOMElement", () => {
  test.each(EMPTY_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeEmptyDOMElement();
  });
});

const NOT_EMPTY_COMPONENTS = formatComponentTests([
  <div data-testid={TID}>Example</div>,
  <div data-testid={TID}> </div>,
]);

describe("not.toBeEmptyDOMElement", () => {
  test.each(NOT_EMPTY_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toBeEmptyDOMElement();
  });
});
