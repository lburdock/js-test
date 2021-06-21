import React from "react";
import { render, screen } from "@testing-library/react";

describe("ByRole", () => {
  // Full list of default roles for elements here: https://www.w3.org/TR/html-aria/#docconformance
  describe("Common element examples", () => {
    test("heading", () => {
      render(
        <>
          <h1>Level 1</h1>
          <h2>Level 2</h2>
        </>
      );

      expect(screen.getAllByRole("heading")).toHaveLength(2);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);
    });

    test("a/link", () => {
      render(<a href="https://www.google.com">Google</a>);

      expect(screen.getByRole("link"));
    });

    test("article", () => {
      render(<article>Hello World</article>);

      expect(screen.getByRole("article"));
    });

    test("aside/complementary", () => {
      render(<aside>Hello World</aside>);

      expect(screen.getByRole("complementary"));
    });

    test("nav/navigation", () => {
      render(<nav>Hello World</nav>);

      expect(screen.getByRole("navigation"));
    });

    test("main", () => {
      render(<main>Hello World</main>);

      expect(screen.getByRole("main"));
    });

    test("hr/separator", () => {
      render(<hr />);

      expect(screen.getByRole("separator"));
    });

    test("img", () => {
      render(
        <>
          <img src="/image.jpg" alt="A thing" />
          <img src="/image2.jpg" alt="" />
        </>
      );

      expect(screen.getAllByRole("img")).toHaveLength(2);
    });

    test("details/group", () => {
      render(
        <details>
          <summary>Show</summary>
          Content
        </details>
      );
      expect(screen.getByRole("group"));
    });

    test("progress/progressbar", () => {
      render(
        <progress max="100" value="70">
          70%
        </progress>
      );
      expect(screen.getByRole("progressbar"));
    });

    test("output/status", () => {
      render(<output name="result">60</output>);
      expect(screen.getByRole("status"));
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

    test("single select/combobox", () => {
      render(
        <select defaultValue="1">
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>
      );
      expect(screen.getByRole("combobox"));
    });

    test("multiple select/listbox", () => {
      render(
        <select multiple defaultValue={["1"]}>
          <option value="1">Example 1</option>
          <option value="2">Example 2</option>
        </select>
      );
      expect(screen.getByRole("listbox"));
    });

    test("textarea/textbox", () => {
      render(<textarea />);

      expect(screen.getByRole("textbox"));
    });

    test("li/listitem", () => {
      render(
        <ul>
          <li>Hello</li>
          <li>World</li>
        </ul>
      );

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    test("ol/list", () => {
      render(
        <ol>
          <li>Hello</li>
        </ol>
      );

      expect(screen.getByRole("list"));
    });

    test("ul/list", () => {
      render(
        <ul>
          <li>Hello</li>
        </ul>
      );

      expect(screen.getByRole("list"));
    });
  });

  describe("Queries", () => {
    describe("getBy/getAllBy", () => {
      test("No match", () => {
        render(<div>Hello World</div>);

        expect(() => {
          screen.getByRole("button");
        }).toThrow();
        expect(() => {
          screen.getAllByRole("button");
        }).toThrow();
      });

      test("1 match", () => {
        render(<button type="button">Okay</button>);

        expect(screen.getByRole("button"));
        expect(screen.getAllByRole("button")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <button type="button">Okay</button>
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
        render(<div>Hello World</div>);

        expect(screen.queryByRole("button")).toBeNull();
        expect(screen.queryAllByRole("button")).toHaveLength(0);
      });

      test("1 match", () => {
        render(<button type="button">Okay</button>);

        expect(screen.queryByRole("button"));
        expect(screen.queryAllByRole("button")).toHaveLength(1);
      });

      test("2 matches", () => {
        render(
          <>
            <button type="button">Okay</button>
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
    // test("exact", () => {
    //   render(<div>Hello World</div>);

    //   expect(screen.getByText("Hello World"));
    //   expect(screen.getByText("llo Worl", { exact: false }));
    // });

    test("hidden", () => {
      render(
        <>
          <main aria-hidden="true">
            <button type="button">Open dialog</button>
          </main>
          <div role="dialog">
            <button type="button">Close dialog</button>
          </div>
        </>
      );

      expect(screen.getAllByRole("button")).toHaveLength(1);

      // Includes hidden buttons when searching
      expect(screen.getAllByRole("button", { hidden: true })).toHaveLength(2);
    });

    test("name", () => {
      render(
        <>
          <button type="button">Okay</button>
          <button type="button">Cancel</button>
        </>
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);
      expect(screen.getAllByRole("button", { name: "Okay" })).toHaveLength(1);
    });

    test("checked", () => {
      render(
        <>
          <input type="checkbox" defaultChecked />
          <input type="checkbox" />
        </>
      );

      expect(screen.getAllByRole("checkbox")).toHaveLength(2);
      expect(screen.getAllByRole("checkbox", { checked: true })).toHaveLength(
        1
      );
      expect(screen.getAllByRole("checkbox", { checked: false })).toHaveLength(
        1
      );
    });

    test("selected - aria-selected", () => {
      render(
        <>
          <button type="button" role="tab" aria-selected="true">
            Native
          </button>
          <button type="button" role="tab" aria-selected="false">
            React
          </button>
        </>
      );

      expect(screen.getAllByRole("tab")).toHaveLength(2);

      // Only looks for selected tabs
      expect(screen.getAllByRole("tab", { selected: true })).toHaveLength(1);

      // Only looks for unselected tabs
      expect(screen.getAllByRole("tab", { selected: false })).toHaveLength(1);
    });

    test("selected - selected", () => {
      render(
        <>
          <select defaultValue="world">
            <option value="hello">Hello</option>
            <option value="world">World</option>
          </select>
        </>
      );

      expect(screen.getAllByRole("option")).toHaveLength(2);

      // Only looks for selected options
      expect(screen.getAllByRole("option", { selected: true })).toHaveLength(1);

      // Only looks for unselected options
      expect(screen.getAllByRole("option", { selected: false })).toHaveLength(
        1
      );
    });

    test("pressed", () => {
      render(
        <>
          <button type="button" aria-pressed="true">
            👍
          </button>
          <button type="button" aria-pressed="false">
            👎
          </button>
        </>
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);

      // Only looks for pressed options
      expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);

      // Only looks for unpressed options
      expect(screen.getAllByRole("button", { pressed: false })).toHaveLength(1);
    });

    test("expanded", () => {
      render(
        <>
          <button type="button" aria-expanded="true">
            👍
          </button>
          <button type="button" aria-expanded="false">
            👎
          </button>
        </>
      );

      expect(screen.getAllByRole("button")).toHaveLength(2);

      // Only looks for pressed options
      expect(screen.getAllByRole("button", { expanded: true })).toHaveLength(1);

      // Only looks for unpressed options
      expect(screen.getAllByRole("button", { expanded: false })).toHaveLength(
        1
      );
    });
  });
});
