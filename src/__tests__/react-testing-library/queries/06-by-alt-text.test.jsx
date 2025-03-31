import { render, screen } from "@testing-library/react";
import { TIMEOUT } from "../../__internal__/constants";

describe("ByAltText", () => {
  describe("Element examples", () => {
    test("image", () => {
      render(<img alt="Example" src="/image.png" />);

      expect(screen.getByAltText("Example")).toBeInTheDocument();
    });

    test("input", () => {
      render(<input type="image" alt="Example" src="/image.png" />);

      expect(screen.getByAltText("Example")).toBeInTheDocument();
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
        </>,
      );

      expect(screen.getAllByAltText(/Example/)).toHaveLength(2);
    });
  });

  describe("Queries", () => {
    test("No match", async () => {
      render(<img alt="Example" src="/image.png" />);

      // get
      expect(() => screen.getByAltText("Nope")).toThrow();
      expect(() => screen.getByAltText("Nope")).toThrow();

      // query
      expect(screen.queryByAltText("Nope")).not.toBeInTheDocument();
      expect(screen.queryAllByAltText("Nope")).toHaveLength(0);

      // find
      await expect(screen.findByAltText("Nope", {}, TIMEOUT)).rejects.toThrow();
      await expect(
        screen.findAllByAltText("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<img alt="Example" src="/image.png" />);

      // get
      expect(screen.getByAltText("Example")).toBeInTheDocument();
      expect(screen.getAllByAltText("Example")).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByAltText("Example")).toBeInTheDocument(); // PREFER: getByAltText
      expect(screen.queryAllByAltText("Example")).toHaveLength(1);

      // find
      await expect(
        screen.findByAltText("Example"),
      ).resolves.toBeInTheDocument();
      await expect(screen.findAllByAltText("Example")).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <img alt="Example 1" src="/image-1.png" />
          <img alt="Example 2" src="/image-2.png" />
        </>,
      );

      // get
      expect(() => screen.getByAltText(/Example/)).toThrow();
      expect(screen.getAllByAltText(/Example/)).toHaveLength(2);

      // query
      expect(() => screen.queryByAltText(/Example/)).toThrow();
      expect(screen.queryAllByAltText(/Example/)).toHaveLength(2);

      // find
      await expect(
        screen.findByAltText(/Example/, {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(screen.findAllByAltText(/Example/)).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(<img alt="Example" src="/image.png" />);

      expect(() => screen.getByAltText("Ex")).toThrow();
      expect(screen.getByAltText("Ex", { exact: false })).toBeInTheDocument();
    });
  });
});
