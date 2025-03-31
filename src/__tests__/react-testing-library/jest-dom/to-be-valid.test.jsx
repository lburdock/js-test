import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const VALID_COMPONENTS = formatComponentTests([
  <input type="text" data-testid={TID} />,
  <input type="text" aria-invalid="false" data-testid={TID} />,
  <form data-testid={TID}>
    <input />
  </form>,
  <form data-testid={TID}>
    <input required defaultValue="Hello" />
  </form>,
]);

describe("toBeValid", () => {
  test.each(VALID_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeValid();
  });
});
