import { render, screen } from "@testing-library/react";
import { TIMEOUT } from "../../__internal__/constants";

describe("ByTitle", () => {
  describe("Queries", () => {
    test("No match", async () => {
      render(<iframe title="Example" src="/embed.html" />);

      // get
      expect(() => screen.getByTitle("Nope")).toThrow();
      expect(() => screen.getByTitle("Nope")).toThrow();

      // query
      expect(screen.queryByTitle("Nope")).not.toBeInTheDocument();
      expect(screen.queryAllByTitle("Nope")).toHaveLength(0);

      // find
      await expect(screen.findByTitle("Nope", {}, TIMEOUT)).rejects.toThrow();
      await expect(
        screen.findAllByTitle("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<iframe title="Example" src="/embed.html" />);

      // get
      expect(screen.getByTitle("Example")).toBeInTheDocument();
      expect(screen.getAllByTitle("Example")).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByTitle("Example")).toBeInTheDocument(); // PREFER: getByTitle
      expect(screen.queryAllByTitle("Example")).toHaveLength(1);

      // find
      await expect(screen.findByTitle("Example")).resolves.toBeInTheDocument();
      await expect(screen.findAllByTitle("Example")).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <iframe title="Example 1" src="/embed-1.html" />
          <iframe title="Example 2" src="/embed-2.html" />
        </>,
      );

      // get
      expect(() => screen.getByTitle(/Example/)).toThrow();
      expect(screen.getAllByTitle(/Example/)).toHaveLength(2);

      // query
      expect(() => screen.queryByTitle(/Example/)).toThrow();
      expect(screen.queryAllByTitle(/Example/)).toHaveLength(2);

      // find
      await expect(
        screen.findByTitle(/Example/, {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(screen.findAllByTitle(/Example/)).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(<iframe title="Example" src="/embed.html" />);

      expect(() => {
        screen.getByTitle("Ex");
      }).toThrow();
      expect(screen.getByTitle("Ex", { exact: false })).toBeInTheDocument();
    });
  });
});
