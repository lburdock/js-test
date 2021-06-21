import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByDisplayValue", () => {
  describe("Element examples", () => {
    test("input", () => {
      render(<input type="text" defaultValue="Example" />);

      expect(screen.getByDisplayValue("Example"));
    });

    test("textarea", () => {
      render(<textarea defaultValue="Example" />);

      expect(screen.getByDisplayValue("Example"));
    });

    test("select", () => {
      render(
        <select defaultValue="1">
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>
      );

      expect(screen.getByDisplayValue("Example 1"));
    });
  });

  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<textarea defaultValue="Example" />);

        expect(() => {
          screen.getByDisplayValue("Nope");
        }).toThrow();
        expect(() => {
          screen.getByDisplayValue("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(<textarea defaultValue="Example" />);

        expect(screen.getByDisplayValue("Example"));
        expect(screen.getAllByDisplayValue("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <textarea defaultValue="Example 1" />
            <textarea defaultValue="Example 2" />
          </>
        );

        expect(() => {
          screen.getByDisplayValue(/Example/);
        }).toThrow();
        expect(screen.getAllByDisplayValue(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<textarea defaultValue="Example" />);

        expect(screen.queryByDisplayValue("Nope")).toBeNull();
        expect(screen.queryAllByDisplayValue("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<textarea defaultValue="Example" />);

        expect(screen.queryByDisplayValue("Example"));
        expect(screen.queryAllByDisplayValue("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <textarea defaultValue="Example 1" />
            <textarea defaultValue="Example 2" />
          </>
        );

        expect(() => {
          screen.queryByDisplayValue(/Example/);
        }).toThrow();
        expect(screen.queryAllByDisplayValue(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(<textarea defaultValue="Example" />);

      expect(() => {
        screen.getByDisplayValue("Ex");
      }).toThrow();
      expect(screen.getByDisplayValue("Ex", { exact: false }));
    });
  });
});
