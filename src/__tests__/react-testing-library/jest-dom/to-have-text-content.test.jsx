import { render, screen } from "@testing-library/react";

describe("toHaveTextContent", () => {
  test("span", () => {
    render(<h1>Text Content</h1>);

    const el = screen.getByRole("heading");

    expect(el).toHaveTextContent("Content");
    expect(el).toHaveTextContent(/^Text Content$/); // to match the whole content
    expect(el).toHaveTextContent(/content$/i); // to use case-insensitive match
    expect(el).not.toHaveTextContent("content");
  });
});

describe("not.toHaveTextContent", () => {
  test("span", () => {
    render(<h1>Text Content</h1>);

    const el = screen.getByRole("heading");

    expect(el).not.toHaveTextContent("content");
  });
});
