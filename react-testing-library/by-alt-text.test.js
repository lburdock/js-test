import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByAltText", () => {
  describe("Element examples", () => {
    test("image", () => {
      render(<img alt="Example" src="/image.png" />);

      expect(screen.getByAltText("Example"));
    });

    test("input", () => {
      render(<input type="image" alt="Example" src="/image.png" />);

      expect(screen.getByAltText("Example"));
    });

    test("area", () => {
      render(
        <>
          <map name="primary">
            <area
              alt="Example 1"
              shape="circle"
              coords="75,75,75"
              href="left.html"
            />
            <area
              alt="Example 2"
              shape="circle"
              coords="275,75,75"
              href="right.html"
            />
          </map>
          <img alt="Infographic" src="/image.png" />
        </>
      );

      expect(screen.getAllByAltText(/Example/)).toHaveLength(2);
    });
  });

  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<img alt="Example" src="/image.png" />);

        expect(() => {
          screen.getByAltText("Nope");
        }).toThrow();
        expect(() => {
          screen.getByAltText("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(<img alt="Example" src="/image.png" />);

        expect(screen.getByAltText("Example"));
        expect(screen.getAllByAltText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <img alt="Example 1" src="/image-1.png" />
            <img alt="Example 2" src="/image-2.png" />
          </>
        );

        expect(() => {
          screen.getByAltText(/Example/);
        }).toThrow();
        expect(screen.getAllByAltText(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<img alt="Example" src="/image.png" />);

        expect(screen.queryByAltText("Nope")).toBeNull();
        expect(screen.queryAllByAltText("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<img alt="Example" src="/image.png" />);

        expect(screen.queryByAltText("Example"));
        expect(screen.queryAllByAltText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <img alt="Example 1" src="/image-1.png" />
            <img alt="Example 2" src="/image-2.png" />
          </>
        );

        expect(() => {
          screen.queryByAltText(/Example/);
        }).toThrow();
        expect(screen.queryAllByAltText(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(<img alt="Example" src="/image.png" />);

      expect(() => {
        screen.getByAltText("Ex");
      }).toThrow();
      expect(screen.getByAltText("Ex", { exact: false }));
    });
  });
});
