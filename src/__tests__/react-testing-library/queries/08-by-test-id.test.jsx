import {
  render,
  screen,
} from "@testing-library/react";
import { TIMEOUT } from "../../__internal__/constants";

describe("ByTestId", () => {
  describe("Queries", () => {
    test("No match", async () => {
      render(<div data-testid="Example" />);

      // get
      expect(() =>
        screen.getByTestId("Nope"),
      ).toThrow();
      expect(() =>
        screen.getByTestId("Nope"),
      ).toThrow();

      // query
      expect(
        screen.queryByTestId("Nope"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryAllByTestId("Nope"),
      ).toHaveLength(0);

      // find
      await expect(
        screen.findByTestId("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findAllByTestId("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<div data-testid="Example" />);

      // get
      expect(
        screen.getByTestId("Example"),
      ).toBeInTheDocument();
      expect(
        screen.getAllByTestId("Example"),
      ).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(
        screen.queryByTestId("Example"),
      ).toBeInTheDocument(); // PREFER: getByTestId
      expect(
        screen.queryAllByTestId("Example"),
      ).toHaveLength(1);

      // find
      await expect(
        screen.findByTestId("Example"),
      ).resolves.toBeInTheDocument();
      await expect(
        screen.findAllByTestId("Example"),
      ).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <div data-testid="Example 1" />
          <div data-testid="Example 2" />
        </>,
      );

      // get
      expect(() =>
        screen.getByTestId(/Example/),
      ).toThrow();
      expect(
        screen.getAllByTestId(/Example/),
      ).toHaveLength(2);

      // query
      expect(() =>
        screen.queryByTestId(/Example/),
      ).toThrow();
      expect(
        screen.queryAllByTestId(/Example/),
      ).toHaveLength(2);

      // find
      await expect(
        screen.findByTestId(/Example/, {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findAllByTestId(/Example/),
      ).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(<div data-testid="Example" />);

      expect(() => screen.getByTestId("Ex")).toThrow();
      expect(
        screen.getByTestId("Ex", { exact: false }),
      ).toBeInTheDocument();
    });
  });
});
