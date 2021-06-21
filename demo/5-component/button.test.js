import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe("Button", () => {
  test("renders button", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Okay</Button>);

    const btn = screen.getByRole("button");
    // screen.debug();
    expect(btn).toHaveTextContent("Okay");
  });

  test("calls onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Okay</Button>);

    const btn = screen.getByRole("button");
    expect(onClick).not.toHaveBeenCalled();

    userEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  test("renders loading state", () => {
    const onClick = jest.fn();
    render(
      <Button loading onClick={onClick}>
        Okay
      </Button>
    );

    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Okay");
    expect(btn).toBeDisabled();

    userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test("renders empty state", () => {
    render(<Button empty>Okay</Button>);

    expect(() => {
      screen.getByRole("button");
    }).toThrow();
    expect(screen.queryByRole("button")).toBeNull();
  });
});
