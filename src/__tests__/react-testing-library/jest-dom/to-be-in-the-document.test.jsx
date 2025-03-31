import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";
import { EMPTY_COMPONENTS } from "./to-be-empty-dom-element.test";

const PRESENT_COMPONENTS = formatComponentTests([
  <button data-testid={TID}>Save</button>,
  ...EMPTY_COMPONENTS,
]);

describe("toBeInTheDocument", () => {
  test.each(PRESENT_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeInTheDocument();
  });
});

const ABSENT_COMPONENTS = formatComponentTests([
  <button>Save</button>, // Doesn't have test id
  <button type="button" style={{ display: "none" }}>
    Save
  </button>,
]);

describe("not.toBeInTheDocument", () => {
  test.each(ABSENT_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.queryByTestId(TID);

    expect(el).not.toBeInTheDocument();
  });
});
