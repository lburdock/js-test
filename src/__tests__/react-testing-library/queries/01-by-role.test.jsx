import { render, screen } from "@testing-library/react";
import { formatComponentTests } from "../../__internal__/format-component-tests";
import { TIMEOUT } from "../../__internal__/constants";

// https://www.w3.org/TR/html-aria/#docconformance
const COMPONENTS = formatComponentTests([
  {
    component: <a href="https://www.google.com">Example</a>,
    role: "link",
  },
  { component: <address>Example</address>, role: "group" },
  { component: <area href="https://www.google.com" />, role: "link" },
  { component: <article>Example</article>, role: "article" },
  { component: <aside>Example</aside>, role: "complementary" },
  { component: <blockquote>Example</blockquote>, role: "blockquote" },
  { component: <button>Example</button>, role: "button" },
  {
    component: (
      <table>
        <caption>Example</caption>
      </table>
    ),
    role: "caption",
  },
  { component: <code>Example</code>, role: "code" },
  { component: <del>Example</del>, role: "deletion" },
  {
    component: (
      <details>
        <summary>Show</summary>
        Content
      </details>
    ),
    role: "group",
  },
  { component: <dfn>Example</dfn>, role: "term" },
  {
    component: (
      <dialog open>
        <p>Example</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    ),
    role: "dialog",
  },
  { component: <em>Example</em>, role: "emphasis" },
  {
    component: (
      <figure>
        <img src="logo.png" />
      </figure>
    ),
    role: "figure",
  },
  { component: <footer>Example</footer>, role: "contentinfo" }, // Depends on ancestry
  { component: <h1>Example</h1>, role: "heading" },
  { component: <header>Example</header>, role: "banner" }, // Depends on ancestry
  { component: <hr />, role: "separator" },
  { component: <img src="/image.jpg" />, role: "img" },
  { component: <ins>Example</ins>, role: "insertion" },
  { component: <li>Example 1</li>, role: "listitem" },
  { component: <main>Example</main>, role: "main" },
  {
    component: (
      <menu>
        <li>
          <button id="save">Share</button>
        </li>
      </menu>
    ),
    role: "list",
  },
  { component: <meter value="50">at 50/100</meter>, role: "meter" },
  { component: <nav>Example</nav>, role: "navigation" },
  {
    component: (
      <ol>
        <li>Example 1</li>
      </ol>
    ),
    role: "list",
  },
  { component: <output name="result">70</output>, role: "status" },
  { component: <p>70</p>, role: "paragraph" },
  {
    component: (
      <progress max="100" value="70">
        70%
      </progress>
    ),
    role: "progressbar",
  },
  {
    component: <section aria-label="Section">Example</section>, // Must have accessible label for role to be region
    role: "region",
  },
  { component: <strong>Example</strong>, role: "strong" },
  { component: <sub>Example</sub>, role: "subscript" },
  { component: <sup>Example</sup>, role: "superscript" },
  { component: <table>Table</table>, role: "table" },
  { component: <tbody>Table body</tbody>, role: "rowgroup" },
  { component: <td>Table data</td>, role: "cell" },
  { component: <tfoot>Table footer</tfoot>, role: "rowgroup" },
  { component: <th>Table data header</th>, role: "columnheader" },
  { component: <thead>Table header</thead>, role: "rowgroup" },
  { component: <tr>Table row</tr>, role: "row" },
  {
    component: (
      <ul>
        <li>Example 1</li>
      </ul>
    ),
    role: "list",
  },
]);

const FORM_COMPONENTS = formatComponentTests([
  {
    component: (
      <fieldset>
        <input type="radio" name="option" value="a" />
        <input type="radio" name="option" value="b" />
      </fieldset>
    ),
    role: "group", // fieldset
  },
  {
    component: (
      <form aria-label="my form">
        <input type="text" />
      </form>
    ),
    role: "form", // Only works when a form has an accessible name
  },
  { component: <input type="button" />, role: "button" },
  { component: <input type="checkbox" />, role: "checkbox" },
  { component: <input type="email" />, role: "textbox" },
  { component: <input type="image" />, role: "button" },
  { component: <input type="number" />, role: "spinbutton" },
  { component: <input type="radio" />, role: "radio" },
  { component: <input type="range" />, role: "slider" },
  { component: <input type="reset" />, role: "button" },
  { component: <input type="search" />, role: "searchbox" },
  { component: <input type="submit" />, role: "button" },
  { component: <input type="tel" />, role: "textbox" },
  { component: <input type="text" />, role: "textbox" },
  { component: <input type="url" />, role: "textbox" },
  {
    component: (
      <optgroup>
        <option value="1">Example 1</option>
      </optgroup>
    ),
    role: "group",
  },
  {
    component: (
      <select defaultValue="1">
        <option value="1">Example 1</option>
      </select>
    ),
    role: "option",
  },
  {
    component: (
      <select defaultValue="1">
        <option value="1">Example 1</option>
      </select>
    ),
    role: "combobox", // single select
  },
  {
    component: (
      <select multiple defaultValue={["1"]}>
        <option value="1">Example 1</option>
      </select>
    ),
    role: "listbox", // multiple select
  },
  { component: <textarea />, role: "textbox" },
]);

// Full list of default roles for elements here: https://www.w3.org/TR/html-aria/#docconformance

describe("Role queries", () => {
  describe("Inherent roles", () => {
    test.each(COMPONENTS)("$role - $info", ({ component, role }) => {
      render(component);

      const el = screen.getByRole(role);

      expect(el).toBeInTheDocument();
    });

    describe("Form components", () => {
      test.each(FORM_COMPONENTS)("$role - $info", ({ component, role }) => {
        render(component);

        const el = screen.getByRole(role);

        expect(el).toBeInTheDocument();
      });
    });
  });

  describe("Queries", () => {
    test("No match", async () => {
      render(<div>Example</div>);

      // get
      expect(() => screen.getByRole("button")).toThrow();
      expect(() => screen.getAllByRole("button")).toThrow();

      // query
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(screen.queryAllByRole("button")).toHaveLength(0);

      // find
      await expect(screen.findByRole("button", {}, TIMEOUT)).rejects.toThrow();
      await expect(
        screen.findAllByRole("button", {}, TIMEOUT),
      ).rejects.toThrow();
    });

    test("1 match", async () => {
      render(<button type="button">Save</button>);

      // get
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getAllByRole("button")).toHaveLength(1);

      // query
      // eslint-disable-next-line testing-library/prefer-presence-queries
      expect(screen.queryByRole("button")).toBeInTheDocument(); // PREFER: getByRole
      expect(screen.queryAllByRole("button")).toHaveLength(1);

      // find
      await expect(screen.findByRole("button")).resolves.toBeInTheDocument();
      await expect(screen.findAllByRole("button")).resolves.toHaveLength(1);
    });

    test("2 matches", async () => {
      render(
        <>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </>,
      );

      // get
      expect(() => screen.getByRole("button")).toThrow();
      expect(screen.getAllByRole("button")).toHaveLength(2);

      // query
      expect(() => screen.queryByRole("button")).toThrow();
      expect(screen.queryAllByRole("button")).toHaveLength(2);

      // find
      await expect(screen.findByRole("button", {}, TIMEOUT)).rejects.toThrow();
      await expect(screen.findAllByRole("button")).resolves.toHaveLength(2);
    });
  });

  describe("Query options", () => {
    test("checked", () => {
      render(
        <>
          <input type="checkbox" defaultChecked />
          <input type="checkbox" />
        </>,
      );

      expect(screen.getAllByRole("checkbox")).toHaveLength(2);

      // Only looks for checked elements
      const elChecked = screen.getAllByRole("checkbox", { checked: true });
      expect(elChecked).toHaveLength(1);

      // Only looks for unchecked elements
      const elUnchecked = screen.getAllByRole("checkbox", { checked: false });
      expect(elUnchecked).toHaveLength(1);
    });

    test("current", () => {
      render(
        <>
          <a href="/example/1" aria-current="page">
            Current page
          </a>
          <a href="/example/2">Another page</a>
        </>,
      );

      expect(screen.getAllByRole("link")).toHaveLength(2);

      // Only looks for aria-current
      const el1 = screen.getByRole("link", { current: "page" });
      expect(el1).toHaveAttribute("href", "/example/1");

      const el2 = screen.getByRole("link", { current: false });
      expect(el2).toHaveAttribute("href", "/example/2");
    });

    test("description", () => {
      render(
        <>
          <div role="alertdialog" aria-describedby="id-1">
            <button>Close</button>
            <div id="id-1">Example 1</div>
          </div>
          <div role="alertdialog" aria-describedby="id-2">
            <button>Close</button>
            <div id="id-2">Example 2</div>
          </div>
        </>,
      );

      expect(screen.getAllByRole("alertdialog")).toHaveLength(2);

      const el1 = screen.getByRole("alertdialog", { description: "Example 1" });
      expect(el1).toBeInTheDocument();

      const el2 = screen.getByRole("alertdialog", { description: "Example 2" });
      expect(el2).toBeInTheDocument();
    });

    test("expanded", () => {
      render(
        <>
          <button type="button" aria-expanded="true">
            Example 1
          </button>
          <button type="button" aria-expanded="false">
            Example 2
          </button>
        </>,
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);

      // Only looks for expanded elements
      const el1 = screen.getByRole("button", { expanded: true });
      expect(el1).toHaveTextContent("Example 1");

      // Only looks for unexpanded elements
      const el2 = screen.getByRole("button", { expanded: false });
      expect(el2).toHaveTextContent("Example 2");
    });

    test("hidden", () => {
      render(
        <>
          <main aria-hidden="true">
            <button type="button">Open</button>
          </main>
          <button type="button">Close</button>
        </>,
      );

      // Only looks for visible elements
      expect(screen.getAllByRole("button")).toHaveLength(1);

      const el1 = screen.getByRole("button");
      expect(el1).toHaveTextContent("Close");

      // Includes BOTH visible and hidden elements when querying the DOM
      const el2 = screen.getAllByRole("button", { hidden: true });
      expect(el2).toHaveLength(2);
    });

    test("level", () => {
      render(
        <>
          <h1>01</h1>
          <h2>02</h2>
          <h3>03</h3>
          <h4>04</h4>
          <h5>05</h5>
          <h6>06</h6>
        </>,
      );

      expect(screen.getAllByRole("heading")).toHaveLength(6);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("01");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("02");
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("03");
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("04");
      expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("05");
      expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("06");
    });

    test("name", () => {
      render(
        <>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </>,
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);
      expect(screen.getAllByRole("button", { name: "Save" })).toHaveLength(1);
    });

    test("pressed", () => {
      render(
        <>
          <button type="button" aria-pressed="true">
            Example 1
          </button>
          <button type="button" aria-pressed="false">
            Example 2
          </button>
        </>,
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);

      // Only looks for pressed elements
      const el1 = screen.getByRole("button", { pressed: true });
      expect(el1).toHaveTextContent("Example 1");

      // Only looks for unpressed elements
      const el2 = screen.getByRole("button", { pressed: false });
      expect(el2).toHaveTextContent("Example 2");
    });

    test("queryFallbacks", () => {
      render(
        <>
          <div role="switch">Example 1</div>
          <div role="switch checkbox">Example 2</div>
        </>,
      );

      expect(screen.getAllByRole("switch")).toHaveLength(2);

      expect(() => screen.getByRole("checkbox")).toThrow();

      const el = screen.getByRole("checkbox", { queryFallbacks: true });
      expect(el).toHaveTextContent("Example 2");
    });

    describe("selected", () => {
      test("aria-selected", () => {
        render(
          <>
            <button type="button" role="tab" aria-selected="true">
              Example 1
            </button>
            <button type="button" role="tab" aria-selected="false">
              Example 2
            </button>
          </>,
        );

        expect(screen.getAllByRole("tab")).toHaveLength(2);

        // Only looks for selected elements
        const el1 = screen.getByRole("tab", { selected: true });
        expect(el1).toHaveTextContent("Example 1");

        // Only looks for unselected elements
        const el2 = screen.getByRole("tab", { selected: false });
        expect(el2).toHaveTextContent("Example 2");
      });

      test("selected form element", () => {
        render(
          <>
            <select defaultValue="1">
              <option value="1">Example 1</option>
              <option value="2">Example 2</option>
            </select>
          </>,
        );

        expect(screen.getAllByRole("option")).toHaveLength(2);

        // Only looks for selected elements
        const el1 = screen.getByRole("option", { selected: true });
        expect(el1).toHaveTextContent("Example 1");

        // Only looks for unselected elements
        const el2 = screen.getByRole("option", { selected: false });
        expect(el2).toHaveTextContent("Example 2");
      });
    });

    test("value", () => {
      render(
        <>
          <button role="spinbutton" aria-valuenow="5">
            Example 1
          </button>
          <button role="spinbutton" aria-valuemin="0">
            Example 2
          </button>
          <button role="spinbutton" aria-valuemax="10">
            Example 3
          </button>
          <button role="spinbutton" aria-valuetext="medium">
            Example 4
          </button>
        </>,
      );

      expect(screen.getAllByRole("spinbutton")).toHaveLength(4);

      const el1 = screen.getByRole("spinbutton", { value: { now: 5 } });
      expect(el1).toHaveTextContent("Example 1");

      const el2 = screen.getByRole("spinbutton", { value: { min: 0 } });
      expect(el2).toHaveTextContent("Example 2");

      const el3 = screen.getByRole("spinbutton", { value: { max: 10 } });
      expect(el3).toHaveTextContent("Example 3");

      const el4 = screen.getByRole("spinbutton", { value: { text: "medium" } });
      expect(el4).toHaveTextContent("Example 4");
    });
  });
});
