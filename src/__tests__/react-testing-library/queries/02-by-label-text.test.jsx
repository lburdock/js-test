import { render, screen } from "@testing-library/react";
import { formatComponentTests } from "../../__internal__/format-component-tests";
import { TIMEOUT } from "../../__internal__/constants";

export const LABELED_COMPONENTS = formatComponentTests([
  <>
    <label htmlFor="name-input">Name</label>
    <input id="name-input" type="checkbox" defaultChecked />
  </>,
  <>
    <label id="name-label">Name</label>
    <input aria-labelledby="name-label" type="checkbox" defaultChecked />
  </>,
  <label>
    Name <input type="checkbox" defaultChecked />
  </label>,
  <label>
    <span>Name</span>
    <input type="checkbox" defaultChecked />
  </label>,

  // THIS LABEL ISN'T ACCESSIBLE
  <input aria-label="Name" type="checkbox" defaultChecked />,
]);

describe("ByLabelText", () => {
  describe("Element examples", () => {
    test.each(LABELED_COMPONENTS)("$info", ({ component }) => {
      render(component);

      const el = screen.getByLabelText("Name");

      expect(el).toBeChecked();
    });
  });

  describe("Queries", () => {
    test("No match", async () => {
      render(
        <label htmlFor="name-input">
          Name
          <input type="text" id="name-input" />
        </label>,
      );

      // get
      expect(() => screen.getByLabelText("Nope")).toThrow();
      expect(() => screen.getAllByLabelText("Nope")).toThrow();

      // queryBy
      expect(screen.queryByLabelText("Nope")).not.toBeInTheDocument();
      expect(screen.queryAllByLabelText("Nope")).toHaveLength(0);

      // find
      await expect(
        screen.findByLabelText("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(
        screen.findAllByLabelText("Nope", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(
        <label htmlFor="name-input">
          Name
          <input type="text" id="name-input" />
        </label>,
      );

      // get
      expect(screen.getByLabelText("Name")).toBeInTheDocument();
      expect(screen.getAllByLabelText("Name")).toHaveLength(1);

      // queryBy
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByLabelText("Name")).toBeInTheDocument(); // PREFER: getByLabelText
      expect(screen.queryAllByLabelText("Name")).toHaveLength(1);

      // find
      await expect(screen.findByLabelText("Name")).resolves.toBeInTheDocument();
      await expect(screen.findAllByLabelText("Name")).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <label htmlFor="first-name">
            First Name
            <input type="text" id="first-name" />
          </label>
          <label htmlFor="last-name">
            Last Name
            <input type="text" id="last-name" />
          </label>
        </>,
      );

      // get
      expect(() => screen.getByLabelText(/Name/)).toThrow();
      expect(screen.getAllByLabelText(/Name/)).toHaveLength(2);

      // queryBy
      expect(() => screen.queryByLabelText(/Name/)).toThrow();
      expect(screen.queryAllByLabelText(/Name/)).toHaveLength(2);

      // find
      await expect(
        screen.findByLabelText(/Name/, {}, TIMEOUT),
      ).rejects.toThrow();
      await expect(screen.findAllByLabelText(/Name/)).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("exact", () => {
      render(
        <label>
          <span>First</span>
          <span>Name</span>
          <input />
        </label>,
      );

      expect(() => screen.getByLabelText("First")).toThrow();

      const el = screen.getByLabelText("First", { exact: false });
      expect(el).toBeInTheDocument();
    });

    test("selector", () => {
      render(
        <>
          <label>
            Name
            <input />
          </label>
          <label>
            Name
            <textarea />
          </label>
        </>,
      );

      // Matches the input and textarea elements
      expect(screen.getAllByLabelText("Name")).toHaveLength(2);
      expect(screen.getAllByLabelText(/Name/)).toHaveLength(2);

      // Matches the input element
      const el = screen.getAllByLabelText("Name", { selector: "input" });
      expect(el).toHaveLength(1);

      const elRegex = screen.getAllByLabelText(/Name/, {
        selector: "textarea",
      });
      expect(elRegex).toHaveLength(1);
    });
  });
});
