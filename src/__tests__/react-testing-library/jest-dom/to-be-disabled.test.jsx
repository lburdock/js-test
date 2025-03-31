import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const COMPONENTS = formatComponentTests([
  <button type="submit" disabled data-testid={TID}>
    Save
  </button>,
  <fieldset disabled>
    <input type="text" data-testid={TID} />
  </fieldset>,
  <input type="text" disabled data-testid={TID} />,
]);

describe("toBeDisabled", () => {
  test.each(COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeDisabled();
  });
});
