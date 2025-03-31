import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

export const CHECKED_COMPONENTS = formatComponentTests([
  <input type="checkbox" checked onChange={vi.fn} data-testid={TID} />,
  <input type="checkbox" defaultChecked data-testid={TID} />,
  <div role="checkbox" aria-checked="true" data-testid={TID} />,

  <input type="radio" value="a" checked onChange={vi.fn} data-testid={TID} />,
  <input type="radio" value="a" defaultChecked data-testid={TID} />,
  <div role="radio" aria-checked="true" data-testid={TID} />,

  <div role="switch" aria-checked="true" data-testid={TID} />,
]);

describe("toBeChecked", () => {
  test.each(CHECKED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeChecked();
  });
});

export const NOT_CHECKED_COMPONENTS = formatComponentTests([
  <input type="checkbox" data-testid={TID} />,
  <div role="checkbox" aria-checked="false" data-testid={TID} />,

  <input type="radio" value="a" data-testid={TID} />,
  <div role="radio" aria-checked="false" data-testid={TID} />,

  <div role="switch" aria-checked="false" data-testid={TID} />,
]);

describe("not.toBeChecked", () => {
  test.each(NOT_CHECKED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toBeChecked();
  });
});
