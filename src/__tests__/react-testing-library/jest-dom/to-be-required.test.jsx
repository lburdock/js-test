import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const REQUIRED_COMPONENTS = formatComponentTests([
  <input required data-testid={TID} />,
  <input aria-required="true" data-testid={TID} />,
  <input required aria-required="false" data-testid={TID} />, // conflicting status
  <select required data-testid={TID} />,
  <textarea required data-testid={TID} />,
  <div role="tree" aria-required="true" data-testid={TID} />, // aria-required is allowed for tree
]);

describe("toBeRequired", () => {
  test.each(REQUIRED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeRequired();
  });
});

const NOT_REQUIRED_COMPONENTS = formatComponentTests([
  <input data-testid={TID} />,
  <input aria-required="false" data-testid={TID} />,
  <select data-testid={TID} />,
  <textarea data-testid={TID} />,
  <div role="tree" required data-testid={TID} />, // required is not allowed for tree
]);

describe("not.toBeRequired", () => {
  test.each(NOT_REQUIRED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toBeRequired();
  });
});
