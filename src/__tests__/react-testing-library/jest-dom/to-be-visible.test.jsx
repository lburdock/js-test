import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const VISIBLE_COMPONENTS = formatComponentTests([
  <div data-testid={TID}>Visible</div>,
  <details open>
    <summary>Accordion title</summary>
    <div data-testid={TID}>Accordion details</div>
  </details>,
]);

describe("toBeVisible", () => {
  test.each(VISIBLE_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeVisible();
  });
});

const HIDDEN_COMPONENTS = formatComponentTests([
  <div style={{ opacity: 0 }} data-testid={TID}>
    Hidden
  </div>,
  <div style={{ visibility: "hidden" }} data-testid={TID}>
    Hidden
  </div>,
  <div style={{ display: "none" }} data-testid={TID}>
    Hidden
  </div>,
  <div hidden data-testid={TID}>
    Hidden
  </div>,
  <details>
    <summary>Accordion title</summary>
    <div data-testid={TID}>Accordion details</div>
  </details>,
]);

describe("not.toBeVisible", () => {
  test.each(HIDDEN_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toBeVisible();
  });
});
