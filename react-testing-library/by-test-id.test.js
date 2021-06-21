import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByTestId", () => {
  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<div data-testid="Example" />);

        expect(() => {
          screen.getByTestId("Nope");
        }).toThrow();
        expect(() => {
          screen.getByTestId("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(<div data-testid="Example" />);

        expect(screen.getByTestId("Example"));
        expect(screen.getAllByTestId("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <div data-testid="Example 1" />
            <div data-testid="Example 2" />
          </>
        );

        expect(() => {
          screen.getByTestId(/Example/);
        }).toThrow();
        expect(screen.getAllByTestId(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<div data-testid="Example" />);

        expect(screen.queryByTestId("Nope")).toBeNull();
        expect(screen.queryAllByTestId("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<div data-testid="Example" />);

        expect(screen.queryByTestId("Example"));
        expect(screen.queryAllByTestId("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <div data-testid="Example 1" />
            <div data-testid="Example 2" />
          </>
        );

        expect(() => {
          screen.queryByTestId(/Example/);
        }).toThrow();
        expect(screen.queryAllByTestId(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(<div data-testid="Example" />);

      expect(() => {
        screen.getByTestId("Ex");
      }).toThrow();
      expect(screen.getByTestId("Ex", { exact: false }));
    });
  });
});
