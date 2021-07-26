import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByPlaceholderText", () => {
  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<input placeholder="Example" />);

        expect(() => {
          screen.getByPlaceholderText("Nope");
        }).toThrow();
        expect(() => {
          screen.getByPlaceholderText("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(<input placeholder="Example" />);

        expect(screen.getByPlaceholderText("Example")).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <input placeholder="Example 1" />
            <input placeholder="Example 2" />
          </>
        );

        expect(() => {
          screen.getByPlaceholderText(/Example/);
        }).toThrow();
        expect(screen.getAllByPlaceholderText(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<input placeholder="Example" />);

        expect(screen.queryByPlaceholderText("Nope")).toBeNull();
        expect(screen.queryAllByPlaceholderText("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<input placeholder="Example" />);

        expect(screen.queryByPlaceholderText("Example")).toBeInTheDocument();
        expect(screen.queryAllByPlaceholderText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <input placeholder="Example 1" />
            <input placeholder="Example 2" />
          </>
        );

        expect(() => {
          screen.queryByPlaceholderText(/Example/);
        }).toThrow();
        expect(screen.queryAllByPlaceholderText(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(<input placeholder="Example" />);

      expect(() => {
        screen.getByPlaceholderText("Ex");
      }).toThrow();
      expect(
        screen.getByPlaceholderText("Ex", { exact: false })
      ).toBeInTheDocument();
    });
  });
});
