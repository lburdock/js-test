import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByTitle", () => {
  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<iframe title="Example" src="/embed.html" />);

        expect(() => {
          screen.getByTitle("Nope");
        }).toThrow();
        expect(() => {
          screen.getByTitle("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(<iframe title="Example" src="/embed.html" />);

        expect(screen.getByTitle("Example"));
        expect(screen.getAllByTitle("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <iframe title="Example 1" src="/embed-1.html" />
            <iframe title="Example 2" src="/embed-2.html" />
          </>
        );

        expect(() => {
          screen.getByTitle(/Example/);
        }).toThrow();
        expect(screen.getAllByTitle(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<iframe title="Example" src="/embed.html" />);

        expect(screen.queryByTitle("Nope")).toBeNull();
        expect(screen.queryAllByTitle("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<iframe title="Example" src="/embed.html" />);

        expect(screen.queryByTitle("Example"));
        expect(screen.queryAllByTitle("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <iframe title="Example 1" src="/embed-1.html" />
            <iframe title="Example 2" src="/embed-2.html" />
          </>
        );

        expect(() => {
          screen.queryByTitle(/Example/);
        }).toThrow();
        expect(screen.queryAllByTitle(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(<iframe title="Example" src="/embed.html" />);

      expect(() => {
        screen.getByTitle("Ex");
      }).toThrow();
      expect(screen.getByTitle("Ex", { exact: false }));
    });
  });
});
