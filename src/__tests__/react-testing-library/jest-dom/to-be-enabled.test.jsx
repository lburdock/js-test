import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const ENABLED_COMPONENTS = formatComponentTests([
  <button type="submit" data-testid={TID}>
    Save
  </button>,
  <fieldset>
    <input type="text" data-testid={TID} />
  </fieldset>,
  <input type="text" data-testid={TID} />,
]);

describe("toBeEnabled", () => {
  test.each(ENABLED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeEnabled();
  });
});
