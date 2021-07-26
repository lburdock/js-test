import React from "react";
import { render, screen } from "@testing-library/react";

describe("toBeVisible", () => {
  test("visible", () => {
    render(<div>Visible</div>);

    const el = screen.getByText("Visible");

    expect(el).toBeVisible();
  });
});

describe("not.toBeVisible", () => {
  test.each([
    {
      id: "zero opacity",
      Component: <div style={{ opacity: 0 }}>Not visible</div>,
    },
    {
      id: "visibility hidden",
      Component: <div style={{ visibility: "hidden" }}>Not visible</div>,
    },
    {
      id: "display none",
      Component: <div style={{ display: "none" }}>Not visible</div>,
    },
    {
      id: "hidden attribute",
      Component: <div hidden>Not visible</div>,
    },
    {
      id: "hidden parent",
      Component: (
        <div style={{ opacity: 0 }}>
          <span>Not visible</span>
        </div>
      ),
    },
  ])("$id", ({ Component }) => {
    render(Component);

    const el = screen.getByText("Not visible");

    expect(el).not.toBeVisible();
  });
});
