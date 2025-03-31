import { render, screen } from "@testing-library/react";
import { TIMEOUT } from "../../__internal__/constants";

describe("ByDisplayValue", () => {
  describe("Element examples", () => {
    test("input", () => {
      render(<input type="text" defaultValue="Example" />);

      expect(screen.getByDisplayValue("Example")).toBeInTheDocument();
    });

    test("textarea", () => {
      render(<textarea defaultValue="Example" />);

      expect(screen.getByDisplayValue("Example")).toBeInTheDocument();
    });

    test("select", () => {
      render(
        <select defaultValue="1">
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>,
      );

      expect(screen.getByDisplayValue("Example 1")).toBeInTheDocument();
    });
  });

  describe("Queries", () => {
    test("No match", async () => {
      render(<textarea defaultValue="Example" />);

      // get
      expect(() => screen.getByDisplayValue("Nope")).toThrow();
      expect(() => screen.getByDisplayValue("Nope")).toThrow();

      // query
      expect(screen.queryByDisplayValue("Nope")).not.toBeInTheDocument();
      expect(screen.queryAllByDisplayValue("Nope")).toHaveLength(0);

      // find
      await expect(
        screen.findByDisplayValue("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findByDisplayValue("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<textarea defaultValue="Example" />);

      // get
      expect(screen.getByDisplayValue("Example")).toBeInTheDocument();
      expect(screen.getAllByDisplayValue("Example")).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByDisplayValue("Example")).toBeInTheDocument(); // PREFER: getByDisplayValue
      expect(screen.queryAllByDisplayValue("Example")).toHaveLength(1);

      // find
      await expect(
        screen.findByDisplayValue("Example"),
      ).resolves.toBeInTheDocument();
      await expect(
        screen.findAllByDisplayValue("Example"),
      ).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <textarea defaultValue="Example 1" />
          <textarea defaultValue="Example 2" />
        </>,
      );

      // get
      expect(() => screen.getByDisplayValue(/Example/)).toThrow();
      expect(screen.getAllByDisplayValue(/Example/)).toHaveLength(2);

      // query
      expect(() => screen.queryByDisplayValue(/Example/)).toThrow();
      expect(screen.queryAllByDisplayValue(/Example/)).toHaveLength(2);

      // find
      await expect(
        screen.findByDisplayValue(/Example/, {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findAllByDisplayValue(/Example/),
      ).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(<textarea defaultValue="Example" />);

      expect(() => screen.getByDisplayValue("Ex")).toThrow();
      expect(
        screen.getByDisplayValue("Ex", { exact: false }),
      ).toBeInTheDocument();
    });

    // Doesn't work
    test.skip("selector", () => {
      render(
        <>
          <input type="text" defaultValue="Example" />
          <textarea defaultValue="Example" />
        </>,
      );

      expect(screen.getAllByDisplayValue("Example")).toHaveLength(2);
      expect(
        screen.getAllByDisplayValue("Example", { selector: "input" }),
      ).toHaveLength(1);
    });
  });
});
