/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByLabelText", () => {
  describe("Element examples", () => {
    test("htmlFor relationship", () => {
      render(
        <>
          <label htmlFor="example">Example</label>
          <input type="text" id="example" />
        </>
      );

      expect(screen.getByLabelText("Example")).toBeInTheDocument();
    });

    test("aria-labelledby relationship", () => {
      render(
        <>
          <label id="example">Example</label>
          <input type="text" aria-labelledby="example" />
        </>
      );

      expect(screen.getByLabelText("Example")).toBeInTheDocument();
    });

    test("Wrapper labels", () => {
      render(
        <label htmlFor="example">
          Example
          <input type="text" id="example" />
        </label>
      );

      expect(screen.getByLabelText("Example")).toBeInTheDocument();
    });

    test("Wrapper labels with text in child", () => {
      render(
        <label htmlFor="example">
          <span>Example</span>
          <input type="text" id="example" />
        </label>
      );

      expect(screen.getByLabelText("Example")).toBeInTheDocument();
    });

    test("aria-label attributes", () => {
      render(<input aria-label="Example" />);

      expect(screen.getByLabelText("Example")).toBeInTheDocument();
    });
  });

  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(
          <label htmlFor="example">
            Example
            <input type="text" id="example" />
          </label>
        );

        expect(() => {
          screen.getByLabelText("Nope");
        }).toThrow();
        expect(() => {
          screen.getByLabelText("Nope");
        }).toThrow();
      });

      test("1 match", () => {
        render(
          <label htmlFor="example">
            Example
            <input type="text" id="example" />
          </label>
        );

        expect(screen.getByLabelText("Example")).toBeInTheDocument();
        expect(screen.getAllByLabelText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <label htmlFor="example1">
              Example 1
              <input type="text" id="example1" />
            </label>
            <label htmlFor="example2">
              Example 2
              <input type="text" id="example2" />
            </label>
          </>
        );

        expect(() => {
          screen.getByLabelText(/Example/);
        }).toThrow();
        expect(screen.getAllByLabelText(/Example/)).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(
          <label htmlFor="example">
            Example
            <input type="text" id="example" />
          </label>
        );

        expect(screen.queryByLabelText("Nope")).toBeNull();
        expect(screen.queryAllByLabelText("Nope")).toHaveLength(0);
      });

      test("1 match", () => {
        render(
          <label htmlFor="example">
            Example
            <input type="text" id="example" />
          </label>
        );

        expect(screen.queryByLabelText("Example")).toBeInTheDocument();
        expect(screen.queryAllByLabelText("Example")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <label htmlFor="example1">
              Example 1
              <input type="text" id="example1" />
            </label>
            <label htmlFor="example2">
              Example 2
              <input type="text" id="example2" />
            </label>
          </>
        );

        expect(() => {
          screen.queryByLabelText(/Example/);
        }).toThrow();
        expect(screen.queryAllByLabelText(/Example/)).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("exact", () => {
      render(
        <label htmlFor="example">
          Example
          <input type="text" id="example" />
        </label>
      );

      expect(() => {
        screen.getByLabelText("Ex");
      }).toThrow();
      expect(screen.getByLabelText("Ex", { exact: false })).toBeInTheDocument();
    });

    test("selector > string example", () => {
      render(
        <>
          <label id="example">Example</label>
          <input aria-labelledby="example" />
          <span aria-labelledby="example">Please enter your username</span>
        </>
      );

      // Matches the input and span elements
      expect(screen.getAllByLabelText("Example")).toHaveLength(2);

      // Matches the input element
      expect(
        screen.getByLabelText("Example", { selector: "input" })
      ).toBeInTheDocument();
    });

    test("selector > regex example", () => {
      render(
        <>
          <label htmlFor="example1">
            Example 1
            <input type="text" id="example1" />
          </label>
          <label htmlFor="example2">
            Example 2
            <textarea id="example2" />
          </label>
        </>
      );

      // Matches the input and textarea elements
      expect(screen.getAllByLabelText(/Example/)).toHaveLength(2);

      // Matches the input element
      expect(
        screen.getByLabelText(/Example/, { selector: "input" })
      ).toBeInTheDocument();
    });
  });
});
