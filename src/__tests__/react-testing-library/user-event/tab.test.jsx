import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Tab", () => {
  test("tab", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <input type="checkbox" />
        <input type="number" />
      </div>
    );

    const checkbox = screen.getByRole("checkbox");
    const number = screen.getByRole("spinbutton");

    expect(document.body).toHaveFocus();

    await user.tab();
    expect(checkbox).toHaveFocus();

    await user.tab();
    expect(number).toHaveFocus();

    // cycle goes back to the body element
    await user.tab();
    expect(document.body).toHaveFocus();

    // simulate Shift-Tab
    await user.tab({ shift: true });
    expect(number).toHaveFocus();
  });
});
