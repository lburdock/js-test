import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByRole", () => {
  // Full list of default roles for elements here: https://www.w3.org/TR/html-aria/#docconformance
  describe("Common element examples", () => {
    test("a / link", () => {
      render(<a href="https://www.google.com">Example</a>);

      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    test("article", () => {
      render(<article>Example</article>);

      expect(screen.getByRole("article")).toBeInTheDocument();
    });

    test("aside / complementary", () => {
      render(<aside>Example</aside>);

      expect(screen.getByRole("complementary")).toBeInTheDocument();
    });

    test("details / group", () => {
      render(
        <details>
          <summary>Show</summary>
          Content
        </details>
      );

      expect(screen.getByRole("group")).toBeInTheDocument();
    });

    test("heading", () => {
      render(
        <>
          <h1>01</h1>
          <h2>02</h2>
          <h3>03</h3>
          <h4>04</h4>
          <h5>05</h5>
          <h6>06</h6>
        </>
      );

      expect(screen.getAllByRole("heading")).toHaveLength(6);

      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("01");
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("02");
      expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("03");
      expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("04");
      expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent("05");
      expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent("06");
    });

    test("hr / separator", () => {
      render(<hr />);

      expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    test("img (with and without alt)", () => {
      render(
        <>
          <img src="/image.jpg" alt="A thing" />
          <img src="/image2.jpg" alt="" />
        </>
      );

      expect(screen.getAllByRole("img")).toHaveLength(2);
    });

    test.each([
      { type: "button", role: "button" },
      { type: "checkbox", role: "checkbox" },
      { type: "email", role: "textbox" },
      { type: "image", role: "button" },
      { type: "number", role: "spinbutton" },
      { type: "radio", role: "radio" },
      { type: "range", role: "slider" },
      { type: "reset", role: "button" },
      { type: "search", role: "searchbox" },
      { type: "submit", role: "button" },
      { type: "tel", role: "textbox" },
      { type: "text", role: "textbox" },
      { type: "url", role: "textbox" },
    ])("input type=$type / $role", ({ type, role }) => {
      render(<input type={type} />);
      expect(screen.getByRole(role)).toBeInTheDocument();
    });

    test("li / listitem", () => {
      render(
        <ul>
          <li>Example 1</li>
          <li>Example 2</li>
        </ul>
      );

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    test("main", () => {
      render(<main>Example</main>);

      expect(screen.getByRole("main")).toBeInTheDocument();
    });

    test("nav / navigation", () => {
      render(<nav>Example</nav>);

      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    test("ol / list", () => {
      render(
        <ol>
          <li>Example 1</li>
        </ol>
      );

      expect(screen.getByRole("list")).toBeInTheDocument();
    });

    test("option", () => {
      render(
        <select defaultValue="1">
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>
      );

      expect(screen.getAllByRole("option")).toHaveLength(2);
    });

    test("output / status", () => {
      render(<output name="result">70</output>);

      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    test("progress / progressbar", () => {
      render(
        <progress max="100" value="70">
          70%
        </progress>
      );

      expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    test("select (multiple) / listbox", () => {
      render(
        <select multiple defaultValue={["1"]}>
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>
      );

      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    test("select (single) / combobox", () => {
      render(
        <select defaultValue="1">
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>
      );

      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    test("textarea / textbox", () => {
      render(<textarea />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("ul / list", () => {
      render(
        <ul>
          <li>Example 1</li>
        </ul>
      );

      expect(screen.getByRole("list")).toBeInTheDocument();
    });
  });

  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<div>Example</div>);

        expect(() => {
          screen.getByRole("button");
        }).toThrow();
        expect(() => {
          screen.getAllByRole("button");
        }).toThrow();
      });

      test("1 match", () => {
        render(<button type="button">Save</button>);

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getAllByRole("button")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <button type="button">Save</button>
            <button type="button">Cancel</button>
          </>
        );

        expect(() => {
          screen.getByRole("button");
        }).toThrow();
        expect(screen.getAllByRole("button")).toHaveLength(2);
      });
    });

    describe("queryBy/queryAllBy", () => {
      test("No match", () => {
        render(<div>Example</div>);

        expect(screen.queryByRole("button")).toBeNull();
        expect(screen.queryAllByRole("button")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<button type="button">Save</button>);

        expect(screen.queryByRole("button")).toBeInTheDocument();
        expect(screen.queryAllByRole("button")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <button type="button">Save</button>
            <button type="button">Cancel</button>
          </>
        );

        expect(() => {
          screen.queryByRole("button");
        }).toThrow();
        expect(screen.queryAllByRole("button")).toHaveLength(2);
      });
    });
  });

  describe("Query attributes", () => {
    test("checked", () => {
      render(
        <>
          <input type="checkbox" defaultChecked />
          <input type="checkbox" />
        </>
      );

      expect(screen.getAllByRole("checkbox")).toHaveLength(2);

      // Only looks for checked elements
      expect(screen.getAllByRole("checkbox", { checked: true })).toHaveLength(
        1
      );

      // Only looks for unchecked elements
      expect(screen.getAllByRole("checkbox", { checked: false })).toHaveLength(
        1
      );
    });

    test("exact", () => {
      render(<button type="button">Save</button>);

      expect(screen.getByRole("butt", { exact: false })).toBeInTheDocument();
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
        </>
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);

      // Only looks for expanded elements
      expect(screen.getAllByRole("button", { expanded: true })).toHaveLength(1);

      // Only looks for unexpanded elements
      expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(
        1
      );
    });

    test("hidden", () => {
      render(
        <>
          <main aria-hidden="true">
            <button type="button">Open</button>
          </main>
          <div role="dialog">
            <button type="button">Close</button>
          </div>
        </>
      );

      // Only looks for visible elements
      expect(screen.getAllByRole("button")).toHaveLength(1);

      // Includes BOTH visible and hidden elements when querying the DOM
      expect(screen.getAllByRole("button", { hidden: true })).toHaveLength(2);
    });

    test("name", () => {
      render(
        <>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </>
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
        </>
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);

      // Only looks for pressed elements
      expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);

      // Only looks for unpressed elements
      expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(1);
    });

    test("selected > aria-selected", () => {
      render(
        <>
          <button type="button" role="tab" aria-selected="true">
            Example 1
          </button>
          <button type="button" role="tab" aria-selected="false">
            Example 2
          </button>
        </>
      );

      expect(screen.getAllByRole("tab")).toHaveLength(2);

      // Only looks for selected elements
      expect(screen.getAllByRole("tab", { selected: true })).toHaveLength(1);

      // Only looks for unselected elements
      expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
    });

    test("selected > selected", () => {
      render(
        <>
          <select defaultValue="1">
            <option value="1">Example 1</option>
            <option value="2">Example 2</option>
          </select>
        </>
      );

      expect(screen.getAllByRole("option")).toHaveLength(2);

      // Only looks for selected elements
      expect(screen.getAllByRole("option", { selected: true })).toHaveLength(1);

      // Only looks for unselected elements
      expect(screen.getAllByRole("option", { selected: false })).toHaveLength(
        1
      );
    });
  });
});
