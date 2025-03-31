import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatComponentTests } from "../../__internal__/format-component-tests";

export const INPUT_COMPONENTS = formatComponentTests([
  <input placeholder="Example" defaultValue="Hello World!" />,
  <textarea placeholder="Example" defaultValue="Hello World!" />,
]);

describe("Clear", () => {
  test.each(INPUT_COMPONENTS)("user.clear: $info", async ({ component }) => {
    const user = userEvent.setup();
    render(component);

    const el = screen.getByPlaceholderText("Example");
    expect(el).toHaveValue("Hello World!");

    await user.clear(el);
    expect(el).toHaveValue("");
  });
});
