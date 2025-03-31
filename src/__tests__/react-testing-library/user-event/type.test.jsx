import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { formatComponentTests } from "../../__internal__/format-component-tests";

export const INPUT_COMPONENTS = formatComponentTests([
  <input placeholder="Example" defaultValue="Hello, " />,
  <textarea placeholder="Example" defaultValue="Hello, " />,
]);

describe("Type", () => {
  describe("Appends text when clear isn't used", () => {
    test.each(INPUT_COMPONENTS)("user.type: $info", async ({ component }) => {
      const user = userEvent.setup();
      render(component);

      const el = screen.getByPlaceholderText("Example");
      expect(el).toHaveValue("Hello, ");

      await user.type(el, "World!");

      expect(el).toHaveValue("Hello, World!");
    });
  });

  describe("Replaces text when clear is used", () => {
    test.each(INPUT_COMPONENTS)("user.type: $info", async ({ component }) => {
      const user = userEvent.setup();
      render(component);

      const el = screen.getByPlaceholderText("Example");
      expect(el).toHaveValue("Hello, ");

      await user.clear(el);
      await user.type(el, "World!");

      expect(el).toHaveValue("World!");
    });
  });
});
