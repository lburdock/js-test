import { render, screen } from "@testing-library/react";
import { TIMEOUT } from "../../__internal__/constants";

describe("ByText", () => {
  test("Element example", async () => {
    render(<a href="/url">Example</a>);

    const el = screen.getByText(/Example/i);
    expect(el).toHaveAttribute("href", "/url");
  });

  describe("Queries", () => {
    test("No match", async () => {
      render(<div>Example</div>);

      // get
      expect(() => screen.getByText("Nope")).toThrow();
      expect(() => screen.getByText("Nope")).toThrow();

      // query
      expect(screen.queryByText("Nope")).not.toBeInTheDocument();
      expect(screen.queryAllByText("Nope")).toHaveLength(0);

      // find
      await expect(screen.findByText("Nope", {}, TIMEOUT)).rejects.toThrow();
      await expect(screen.findAllByText("Nope", {}, TIMEOUT)).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<div>Example</div>);

      // get
      expect(screen.getByText("Example")).toBeInTheDocument();
      expect(screen.getAllByText("Example")).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByText("Example")).toBeInTheDocument(); // PREFER: getByText
      expect(screen.queryAllByText("Example")).toHaveLength(1);

      // find
      await expect(screen.findByText("Example")).resolves.toBeInTheDocument();
      await expect(screen.findAllByText("Example")).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <div>Example 1</div>
          <div>Example 2</div>
        </>,
      );

      // get
      expect(() => screen.getByText(/Example/)).toThrow();
      expect(screen.getAllByText(/Example/)).toHaveLength(2);

      // query
      expect(() => screen.queryByText(/Example/)).toThrow();
      expect(screen.queryAllByText(/Example/)).toHaveLength(2);

      // find
      await expect(screen.findByText(/Example/, {}, TIMEOUT)).rejects.toThrow();
      await expect(screen.findAllByText(/Example/)).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(<div>Example</div>);

      expect(() => screen.getByText("Ex")).toThrow();
      expect(screen.getByText("Ex", { exact: false })).toBeInTheDocument();
    });

    test("ignore", () => {
      render(
        <>
          <div>Example 1</div>
          <p>Example 2</p>
        </>,
      );

      // Matches both elements
      expect(screen.getAllByText(/Example/)).toHaveLength(2);

      // Matches the paragraph element
      expect(screen.getAllByText(/Example/, { ignore: "div" })).toHaveLength(1);
    });

    test("selector", () => {
      render(
        <>
          <div>Example 1</div>
          <p>Example 2</p>
        </>,
      );

      // Matches both elements
      expect(screen.getAllByText(/Example/)).toHaveLength(2);

      // Matches the div element
      expect(screen.getAllByText(/Example/, { selector: "div" })).toHaveLength(
        1,
      );
    });
  });
});
