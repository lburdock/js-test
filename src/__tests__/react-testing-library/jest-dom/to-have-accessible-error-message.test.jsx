import { render, screen } from "@testing-library/react";

const TextFieldWithError = () => (
  <>
    <input aria-invalid="true" aria-errormessage="error-message" />
    <div id="error-message" role="alert">
      This field is invalid
    </div>
  </>
);

describe("toHaveErrorMessage", () => {
  test("input with error", () => {
    render(<TextFieldWithError />);

    const el = screen.getByRole("textbox");

    expect(el).toHaveAccessibleErrorMessage();
    expect(el).toHaveAccessibleErrorMessage("This field is invalid");
    expect(el).toHaveAccessibleErrorMessage(/invalid/i);
  });
});

describe("not.toHaveErrorMessage", () => {
  test("error message doesn't match", () => {
    render(<TextFieldWithError />);

    const el = screen.getByRole("textbox");
    expect(el).not.toHaveAccessibleErrorMessage("Incorrect error message");
  });

  test("input without error", () => {
    render(<input />);

    const el = screen.getByRole("textbox");
    expect(el).not.toHaveAccessibleErrorMessage();
  });

  test("input with aria-invalid set to false", () => {
    render(<input aria-invalid="false" aria-errormessage="error-message" />);

    const el = screen.getByRole("textbox");
    expect(el).not.toHaveAccessibleErrorMessage();
  });
});
