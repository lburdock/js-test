import React from "react";
import { render, screen } from "@testing-library/react";

describe("toHaveErrorMessage", () => {
  test("input with error", () => {
    render(
      <>
        <label htmlFor="startTime">
          Please enter a start time:
          <input
            id="startTime"
            type="text"
            aria-errormessage="msgID"
            aria-invalid="true"
            defaultValue="11:30 PM"
          />
        </label>
        <span id="msgID">Invalid time!</span>
      </>
    );

    const el = screen.getByLabelText(/start time/);

    expect(el).toHaveErrorMessage("Invalid time!");
    expect(el).toHaveErrorMessage(/invalid/i);
    expect(el).not.toHaveErrorMessage("Pikachu!");
  });
});
