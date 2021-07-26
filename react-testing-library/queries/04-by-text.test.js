import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByText", () => {
  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<div>Example</div>);

        expect(() => {
          screen.getByText("Nope");
        }).toThrow();
        expect(() => {
          screen.getByText("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(<div>Example</div>);

        expect(screen.getByText("Example")).toBeInTheDocument();
        expect(screen.getAllByText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <div>Example 1</div>
            <div>Example 2</div>
          </>
        );

        expect(() => {
          screen.getByText(/Example/);
        }).toThrow();
        expect(screen.getAllByText(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<div>Example</div>);

        expect(screen.queryByText("Nope")).toBeNull();
        expect(screen.queryAllByText("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<div>Example</div>);

        expect(screen.queryByText("Example")).toBeInTheDocument();
        expect(screen.queryAllByText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <div>Example 1</div>
            <div>Example 2</div>
          </>
        );

        expect(() => {
          screen.queryByText(/Example/);
        }).toThrow();
        expect(screen.queryAllByText(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(<div>Example</div>);

      expect(() => {
        screen.getByText("Ex");
      }).toThrow();
      expect(screen.getByText("Ex", { exact: false })).toBeInTheDocument();
    });

    test("selector", () => {
      render(
        <>
          <div>Example 1</div>
          <p>Example 2</p>
        </>
      );

      // Matches both elements
      expect(screen.getAllByText(/Example/)).toHaveLength(2);

      // Matches the div element
      expect(
        screen.getByText(/Example/, { selector: "div" })
      ).toBeInTheDocument();
    });

    test("ignore", () => {
      render(
        <>
          <div>Example 1</div>
          <p>Example 2</p>
        </>
      );

      // Matches both elements
      expect(screen.getAllByText(/Example/)).toHaveLength(2);

      // Matches the paragraph element
      expect(screen.getAllByText(/Example/, { ignore: "div" })).toHaveLength(1);
    });
  });
});
