import { render, screen } from "@testing-library/react";
import { formatComponentTests } from "../../__internal__/format-component-tests";
import { TIMEOUT } from "../../__internal__/constants";

export const INPUT_COMPONENTS = formatComponentTests([
  <input placeholder="Name" />,
  <textarea placeholder="Name" />,
]);

describe("ByPlaceholderText", () => {
  describe("Element examples", () => {
    test.each(INPUT_COMPONENTS)("$info", ({ component }) => {
      render(component);

      const el = screen.getByPlaceholderText("Name");

      expect(el).toBeInTheDocument();
    });
  });

  describe("Queries", () => {
    test("No match", async () => {
      render(<input placeholder="Name" />);

      // get
      expect(() => screen.getByPlaceholderText("Nope")).toThrow();
      expect(() => screen.getByPlaceholderText("Nope")).toThrow();

      // query
      expect(screen.queryByPlaceholderText("Nope")).not.toBeInTheDocument();
      expect(screen.queryAllByPlaceholderText("Nope")).toHaveLength(0);

      // find
      await expect(
        screen.findByPlaceholderText("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findAllByPlaceholderText("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<input placeholder="Name" />);

      // get
      expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText("Name")).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByPlaceholderText("Name")).toBeInTheDocument(); // PREFER: getByPlaceholderText
      expect(screen.queryAllByPlaceholderText("Name")).toHaveLength(1);

      // find
      await expect(
        screen.findByPlaceholderText("Name"),
      ).resolves.toBeInTheDocument();
      await expect(
        screen.findAllByPlaceholderText("Name"),
      ).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <input placeholder="First Name" />
          <input placeholder="Last Name" />
        </>,
      );

      // get
      expect(() => screen.getByPlaceholderText(/Name/)).toThrow();
      expect(screen.getAllByPlaceholderText(/Name/)).toHaveLength(2);

      // query
      expect(() => screen.queryByPlaceholderText(/Name/)).toThrow();
      expect(screen.queryAllByPlaceholderText(/Name/)).toHaveLength(2);

      // find
      await expect(
        screen.findByPlaceholderText(/Name/, {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findAllByPlaceholderText(/Name/),
      ).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(<input placeholder="First Name" />);

      expect(() => screen.getByPlaceholderText("Name")).toThrow();
      expect(
        screen.getByPlaceholderText("Name", { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
