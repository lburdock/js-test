import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const INVALID_COMPONENTS = formatComponentTests([
  <input type="text" aria-invalid data-testid={TID} />,
  <input type="text" aria-invalid="true" data-testid={TID} />,
  <form data-testid={TID}>
    <input required />
  </form>,
]);

describe("toBeInvalid", () => {
  test.each(INVALID_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toBeInvalid();
  });
});
