import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Click", () => {
  test("Single click", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<input type="checkbox" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  test("Double click", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<input type="checkbox" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    await user.dblClick(checkbox);

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(checkbox).not.toBeChecked();
  });

  test("Triple click", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<input type="checkbox" onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    await user.tripleClick(checkbox);

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(checkbox).toBeChecked();
  });
});
