import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";
import {
  CHECKED_COMPONENTS,
  NOT_CHECKED_COMPONENTS,
} from "./to-be-checked.test";

const PARTIALLY_CHECKED_COMPONENTS = formatComponentTests([
  <input type="checkbox" aria-checked="mixed" data-testid={TID} />,
  <div role="checkbox" aria-checked="mixed" data-testid={TID} />,
]);

describe("toBePartiallyChecked", () => {
  test.each(PARTIALLY_CHECKED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBePartiallyChecked();
  });
});

const NOT_PARTIALLY_CHECKED_COMPONENTS = [
  ...CHECKED_COMPONENTS,
  ...NOT_CHECKED_COMPONENTS,
];

describe("not.toBePartiallyChecked", () => {
  test.each(NOT_PARTIALLY_CHECKED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toBePartiallyChecked();
  });
});
