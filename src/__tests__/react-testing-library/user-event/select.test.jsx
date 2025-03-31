import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Select = props => (
  <select {...props}>
    <option value="1">A</option>
    <option value="2">B</option>
    <option value="3">C</option>
  </select>
);

describe("Select", () => {
  describe("multiple select", () => {
    test("selectOptions - using array", async () => {
      const user = userEvent.setup();
      render(<Select multiple />);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveValue([]);

      await user.selectOptions(listbox, ["1", "C"]);

      expect(screen.getByRole("option", { name: "A" }).selected).toBe(true);
      expect(screen.getByRole("option", { name: "B" }).selected).toBe(false);
      expect(screen.getByRole("option", { name: "C" }).selected).toBe(true);

      expect(listbox).toHaveDisplayValue(["A", "C"]);
    });

    test("selectOptions - using string", async () => {
      const user = userEvent.setup();
      render(<Select multiple />);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveValue([]);

      await user.selectOptions(listbox, "3");

      expect(listbox).toHaveDisplayValue("C");
    });

    test("deselectOptions - using string array", async () => {
      const user = userEvent.setup();
      render(<Select multiple defaultValue={["2"]} />);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveDisplayValue(["B"]);

      await user.deselectOptions(listbox, "B");
      expect(screen.getByText("B").selected).toBe(false);
      expect(listbox).toHaveDisplayValue([]);
    });

    test("deselectOptions - using selector", async () => {
      const user = userEvent.setup();
      render(<Select multiple defaultValue={["1", "2", "3"]} />);

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveDisplayValue(["A", "B", "C"]);

      await user.deselectOptions(listbox, [
        screen.getByText("A"),
        screen.getByText("C"),
      ]);
      expect(screen.getByRole("option", { name: "A" }).selected).toBe(false);
      expect(screen.getByRole("option", { name: "B" }).selected).toBe(true);
      expect(screen.getByRole("option", { name: "C" }).selected).toBe(false);
      expect(listbox).toHaveDisplayValue(["B"]);
    });
  });

  describe("single select", () => {
    test("selectOptions - using value", async () => {
      const user = userEvent.setup();
      render(<Select />);

      const combobox = screen.getByRole("combobox");

      await user.selectOptions(combobox, "2");

      expect(combobox).toHaveDisplayValue("B");
    });

    test("selectOptions - using display value", async () => {
      const user = userEvent.setup();
      render(<Select />);

      const combobox = screen.getByRole("combobox");

      await user.selectOptions(combobox, "B");

      expect(combobox).toHaveDisplayValue("B");
    });

    test("selectOptions - using selector", async () => {
      const user = userEvent.setup();
      render(<Select />);

      const combobox = screen.getByRole("combobox");

      await user.selectOptions(combobox, screen.getByText("B"));

      expect(combobox).toHaveDisplayValue("B");
    });

    test.fails(
      "FAILS: You can't deselect an option from a single select",
      async () => {
        const user = userEvent.setup();
        render(<Select />);

        const combobox = screen.getByRole("combobox");
        await user.selectOptions(combobox, "B");
        expect(combobox).toHaveDisplayValue("B");

        // Single selects don't let you deselect an option
        await user.deselectOptions(combobox, "B");
      },
    );
  });
});
