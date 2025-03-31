import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "./user";

describe("User", () => {
  test("Displays text", () => {
    render(<User user="Test user" onSave={vi.fn} />);

    expect(screen.getByDisplayValue("Test user")).toBeDisabled();
    expect(screen.getByRole("img")).toHaveTextContent("T");
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Save" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancel" }),
    ).not.toBeInTheDocument();
  });

  test("Can edit", async () => {
    const mockSave = vi.fn();
    const user = userEvent.setup();

    render(<User user="Test user" onSave={mockSave} />);

    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);

    const input = screen.getByDisplayValue("Test user");
    await user.click(input);
    await user.clear(input);
    await user.type(input, "Foo");
    expect(screen.getByRole("img")).toHaveTextContent("F");

    const saveButton = screen.getByRole("button", { name: "Save" });
    await user.click(saveButton);

    expect(mockSave).toHaveBeenCalledWith("Foo");
    expect(screen.getByDisplayValue("Foo")).toBeDisabled();
  });

  test("Can cancel", async () => {
    const mockSave = vi.fn();
    const user = userEvent.setup();

    render(<User user="Test user" onSave={mockSave} />);

    const editButton = screen.getByRole("button", { name: "Edit" });
    await user.click(editButton);

    const input = screen.getByDisplayValue("Test user");
    await user.click(input);
    await user.clear(input);
    await user.type(input, "Foo");
    expect(screen.getByRole("img")).toHaveTextContent("F");

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);

    expect(mockSave).not.toHaveBeenCalled();
    expect(screen.getByDisplayValue("Test user")).toBeDisabled();
    expect(screen.getByRole("img")).toHaveTextContent("T");
  });
});
