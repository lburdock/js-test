import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import User from "./user";

const user = { avatar: "image.png", name: "First Last" };

describe("User", () => {
  test("renders the User component", () => {
    render(<User user={user} />);

    const section = screen.getByTestId("user");
    // screen.debug(section);
    expect(section).toBeInTheDocument();
  });

  test("renders the image", () => {
    render(<User user={user} />);

    const imgByRole = screen.getByRole("img");
    // screen.debug(imgByRole);
    expect(imgByRole).toHaveAccessibleName("First Last avatar");

    // Alternate query method
    const imgByAlt = screen.getByAltText("First Last avatar");
    expect(imgByAlt).toBeInTheDocument();
  });

  test("renders the input", () => {
    render(<User user={user} />);

    const inputByRole = screen.getByRole("textbox");
    expect(inputByRole).toHaveDisplayValue("First Last");

    const inputByLabel = screen.getByLabelText("Name:");
    expect(inputByLabel).toHaveDisplayValue("First Last");

    const inputByPlaceholder = screen.getByPlaceholderText("Enter your name");
    expect(inputByPlaceholder).toHaveDisplayValue("First Last");

    const inputByValue = screen.getByDisplayValue("First Last");
    expect(inputByValue).toBeInTheDocument();

    const inputByTitle = screen.getByTitle("User name");
    expect(inputByTitle).toHaveDisplayValue("First Last");
  });

  test("renders the button", () => {
    render(<User user={user} />);

    const buttonByRole = screen.getByRole("button");
    expect(buttonByRole).toHaveTextContent("Edit");

    const button = screen.getByText("Edit");
    expect(button).toBeInTheDocument();
  });

  test("edit functionality", () => {
    const onSave = jest.fn();
    render(<User onSave={onSave} user={user} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();

    userEvent.click(screen.getByText("Edit"));

    expect(input).toBeEnabled();

    userEvent.clear(input);
    userEvent.type(input, "New Name");
    userEvent.click(screen.getByText("Save"));

    expect(input).toHaveDisplayValue("New Name");
    expect(onSave).toHaveBeenCalledWith("New Name");
  });

  test("cancel functionality", () => {
    const onSave = jest.fn();
    render(<User onSave={onSave} user={user} />);

    const input = screen.getByRole("textbox");

    expect(input).toBeDisabled();

    userEvent.click(screen.getByText("Edit"));

    expect(input).toBeEnabled();

    userEvent.clear(input);
    userEvent.type(input, "New Name");
    userEvent.click(screen.getByText("Cancel"));

    expect(input).toHaveDisplayValue("First Last");
    expect(onSave).not.toHaveBeenCalled();
  });
});
