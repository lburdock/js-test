import React from "react";
import { render, screen } from "@testing-library/react";

// TODO: clean up and break up into smaller files
describe("jest-dom", () => {
  // TODO: add more disabled element examples
  test("disabled", () => {
    render(
      <button disabled type="button">
        Okay
      </button>
    );

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).not.toBeEnabled();
  });

  test("enabled", () => {
    render(<button type="button">Okay</button>);

    expect(screen.getByRole("button")).toBeEnabled();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  test("empty element", () => {
    render(
      <>
        <div data-testid="empty">{null}</div>
        <div data-testid="not-empty">Hello</div>
        <div data-testid="with-whitespace"> </div>
      </>
    );

    expect(screen.getByTestId("empty")).toBeEmptyDOMElement();
    expect(screen.getByTestId("not-empty")).not.toBeEmptyDOMElement();
    expect(screen.getByTestId("with-whitespace")).not.toBeEmptyDOMElement();
  });

  test("in document", () => {
    render(<button type="button">Okay</button>);

    expect(screen.getByRole("button")).toBeInTheDocument();

    // Use `queryBy` so it doesn't throw an error when it can't find the element
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  test("visibility", () => {
    render(
      <>
        <div data-testid="zero-opacity" style={{ opacity: 0 }}>
          Zero Opacity Example
        </div>
        <div data-testid="visibility-hidden" style={{ visibility: "hidden" }}>
          Visibility Hidden Example
        </div>
        <div data-testid="display-none" style={{ display: "none" }}>
          Display None Example
        </div>
        <div style={{ opacity: 0 }}>
          <span data-testid="hidden-parent">Hidden Parent Example</span>
        </div>
        <div data-testid="visible">Visible Example</div>
        <div data-testid="hidden-attribute" hidden>
          Hidden Attribute Example
        </div>
      </>
    );

    expect(screen.getByText("Zero Opacity Example")).not.toBeVisible();
    expect(screen.getByText("Visibility Hidden Example")).not.toBeVisible();
    expect(screen.getByText("Display None Example")).not.toBeVisible();
    expect(screen.getByText("Hidden Parent Example")).not.toBeVisible();
    expect(screen.getByText("Visible Example")).toBeVisible();
    expect(screen.getByText("Hidden Attribute Example")).not.toBeVisible();
  });

  test("contains element", () => {
    render(
      <>
        <span data-testid="ancestor">
          <span data-testid="descendant">Hello</span>
        </span>
        <span data-testid="unrelated">World</span>
      </>
    );

    const ancestor = screen.getByTestId("ancestor");
    const descendant = screen.getByTestId("descendant");
    const unrelatedElement = screen.getByTestId("unrelated");

    expect(ancestor).toContainElement(descendant);
    expect(descendant).not.toContainElement(ancestor);
    expect(ancestor).not.toContainElement(unrelatedElement);
  });

  test("contains html (not recommended)", () => {
    render(
      <span data-testid="parent">
        <span data-testid="child" />
      </span>
    );

    expect(screen.getByTestId("parent")).toContainHTML(
      '<span data-testid="child"></span>'
    );
    expect(screen.getByTestId("parent")).toContainHTML(
      '<span data-testid="child" />'
    );
    expect(screen.getByTestId("parent")).not.toContainHTML("<br />");
  });

  test("attribute", () => {
    render(
      <button data-testid="ok-button" type="submit" disabled>
        ok
      </button>
    );

    const button = screen.getByTestId("ok-button");

    expect(button).toHaveAttribute("disabled");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).not.toHaveAttribute("type", "button");

    expect(button).toHaveAttribute("type", expect.stringContaining("sub"));
    expect(button).toHaveAttribute("type", expect.not.stringContaining("but"));
  });

  test("class", () => {
    render(
      <>
        <button data-testid="delete-button" className="btn extra btn-danger">
          Delete item
        </button>
        <button data-testid="no-classes">No Classes</button>
      </>
    );

    const deleteButton = screen.getByTestId("delete-button");
    const noClasses = screen.getByTestId("no-classes");

    expect(deleteButton).toHaveClass("extra");
    expect(deleteButton).toHaveClass("btn-danger btn");
    expect(deleteButton).toHaveClass("btn-danger", "btn");
    expect(deleteButton).not.toHaveClass("btn-link");

    expect(deleteButton).toHaveClass("btn-danger extra btn", { exact: true }); // to check if the element has EXACTLY a set of classes
    expect(deleteButton).not.toHaveClass("btn-danger extra", { exact: true }); // if it has more than expected it is going to fail

    expect(noClasses).not.toHaveClass();
  });

  test("focus", () => {
    render(
      <div>
        <input type="text" data-testid="element-to-focus" />
      </div>
    );

    const input = screen.getByTestId("element-to-focus");

    input.focus();
    expect(input).toHaveFocus();

    input.blur();
    expect(input).not.toHaveFocus();
  });

  test("style", () => {
    render(
      <button
        data-testid="delete-button"
        style={{ display: "none", backgroundColor: "red" }}
      >
        Delete item
      </button>
    );

    const button = screen.getByTestId("delete-button");

    expect(button).toHaveStyle("display: none");
    expect(button).toHaveStyle({ display: "none" });
    expect(button).toHaveStyle(`
  background-color: red;
  display: none;
`);
    expect(button).toHaveStyle({
      backgroundColor: "red",
      display: "none",
    });
    expect(button).not.toHaveStyle(`
  background-color: blue;
  display: none;
`);
    expect(button).not.toHaveStyle({
      backgroundColor: "blue",
      display: "none",
    });
  });

  test("text content", () => {
    render(<span data-testid="text-content">Text Content</span>);

    const element = screen.getByTestId("text-content");

    expect(element).toHaveTextContent("Content");
    expect(element).toHaveTextContent(/^Text Content$/); // to match the whole content
    expect(element).toHaveTextContent(/content$/i); // to use case-insensitive match
    expect(element).not.toHaveTextContent("content");
  });

  describe("accessibility", () => {
    test("accessible description", () => {
      render(
        <>
          <a
            data-testid="link"
            href="/"
            aria-label="Home page"
            title="A link to start over"
          >
            Start
          </a>
          <a data-testid="extra-link" href="/about" aria-label="About page">
            About
          </a>
          <img src="avatar.jpg" data-testid="avatar" alt="User profile pic" />
          <img
            src="logo.jpg"
            data-testid="logo"
            alt="Company logo"
            aria-describedby="t1"
          />
          <span id="t1" role="presentation">
            The logo of Our Company
          </span>
        </>
      );

      expect(screen.getByTestId("link")).toHaveAccessibleDescription();
      expect(screen.getByTestId("link")).toHaveAccessibleDescription(
        "A link to start over"
      );
      expect(screen.getByTestId("link")).not.toHaveAccessibleDescription(
        "Home page"
      );
      expect(
        screen.getByTestId("extra-link")
      ).not.toHaveAccessibleDescription();
      expect(screen.getByTestId("avatar")).not.toHaveAccessibleDescription();
      expect(screen.getByTestId("logo")).not.toHaveAccessibleDescription(
        "Company logo"
      );
      expect(screen.getByTestId("logo")).toHaveAccessibleDescription(
        "The logo of Our Company"
      );
    });

    test("accessible name", () => {
      render(
        <>
          <img data-testid="img-alt" src="" alt="Test alt" />
          <img data-testid="img-empty-alt" src="" alt="" />
          <svg data-testid="svg-title">
            <title>Test title</title>
          </svg>
          <button data-testid="button-img-alt">
            <img src="" alt="Test" />
          </button>
          <p>
            <img data-testid="img-paragraph" src="" alt="" /> Test content
          </p>
          <button data-testid="svg-button">
            <svg>
              <title>Test</title>
            </svg>
          </button>
          <div>
            <svg data-testid="svg-without-title" />
          </div>
          <input data-testid="input-title" title="test" />
        </>
      );

      expect(screen.getByTestId("img-alt")).toHaveAccessibleName("Test alt");
      expect(screen.getByTestId("img-empty-alt")).not.toHaveAccessibleName();
      expect(screen.getByTestId("svg-title")).toHaveAccessibleName(
        "Test title"
      );
      expect(screen.getByTestId("button-img-alt")).toHaveAccessibleName();
      expect(screen.getByTestId("img-paragraph")).not.toHaveAccessibleName();
      expect(screen.getByTestId("svg-button")).toHaveAccessibleName();
      expect(
        screen.getByTestId("svg-without-title")
      ).not.toHaveAccessibleName();
      expect(screen.getByTestId("input-title")).toHaveAccessibleName();
    });
  });

  describe("form", () => {
    test("required", () => {
      render(
        <>
          <input data-testid="required-input" required />
          <input data-testid="aria-required-input" aria-required="true" />
          <input
            data-testid="conflicted-input"
            required
            aria-required="false"
          />
          <input data-testid="aria-not-required-input" aria-required="false" />
          <input data-testid="optional-input" />
          <input data-testid="unsupported-type" type="image" required />
          <select data-testid="select" required />
          <textarea data-testid="textarea" required />
          <div data-testid="supported-role" role="tree" required />
          <div
            data-testid="supported-role-aria"
            role="tree"
            aria-required="true"
          />
        </>
      );

      expect(screen.getByTestId("required-input")).toBeRequired();
      expect(screen.getByTestId("aria-required-input")).toBeRequired();
      expect(screen.getByTestId("conflicted-input")).toBeRequired();
      expect(screen.getByTestId("aria-not-required-input")).not.toBeRequired();
      expect(screen.getByTestId("optional-input")).not.toBeRequired();
      expect(screen.getByTestId("unsupported-type")).not.toBeRequired();
      expect(screen.getByTestId("select")).toBeRequired();
      expect(screen.getByTestId("textarea")).toBeRequired();
      expect(screen.getByTestId("supported-role")).not.toBeRequired();
      expect(screen.getByTestId("supported-role-aria")).toBeRequired();
    });

    test("validity", () => {
      render(
        <>
          <input data-testid="no-aria-invalid" />
          <input data-testid="aria-invalid" aria-invalid />
          <input data-testid="aria-invalid-value" aria-invalid="true" />
          <input data-testid="aria-invalid-false" aria-invalid="false" />

          <form data-testid="valid-form">
            <input />
          </form>

          <form data-testid="required-valid-form">
            <input required defaultValue="Hello" />
          </form>

          <form data-testid="required-invalid-form">
            <input required />
          </form>
        </>
      );

      expect(screen.getByTestId("no-aria-invalid")).toBeValid();
      expect(screen.getByTestId("no-aria-invalid")).not.toBeInvalid();

      expect(screen.getByTestId("aria-invalid")).toBeInvalid();
      expect(screen.getByTestId("aria-invalid")).not.toBeValid();

      expect(screen.getByTestId("aria-invalid-value")).toBeInvalid();
      expect(screen.getByTestId("aria-invalid-value")).not.toBeValid();

      expect(screen.getByTestId("aria-invalid-false")).toBeValid();
      expect(screen.getByTestId("aria-invalid-false")).not.toBeInvalid();

      expect(screen.getByTestId("valid-form")).toBeValid();
      expect(screen.getByTestId("valid-form")).not.toBeInvalid();

      expect(screen.getByTestId("required-valid-form")).toBeValid();
      expect(screen.getByTestId("required-valid-form")).not.toBeInvalid();

      expect(screen.getByTestId("required-invalid-form")).toBeInvalid();
      expect(screen.getByTestId("required-invalid-form")).not.toBeValid();
    });

    test("value", () => {
      render(
        <>
          <input type="text" defaultValue="text" data-testid="input-text" />
          <input type="number" defaultValue="5" data-testid="input-number" />
          <input type="text" data-testid="input-empty" />
          <select
            multiple
            data-testid="select-number"
            defaultValue={["second", "third"]}
          >
            <option value="first">First Value</option>
            <option value="second">Second Value</option>
            <option value="third">Third Value</option>
          </select>
        </>
      );

      expect(screen.getByTestId("input-text")).toHaveValue("text");
      expect(screen.getByTestId("input-number")).toHaveValue(5);
      expect(screen.getByTestId("input-empty")).not.toHaveValue();
      expect(screen.getByTestId("select-number")).toHaveValue([
        "second",
        "third",
      ]);
    });

    // Can only pass: string | RegExp | (string|RegExp)[]
    describe("display value", () => {
      test("textbox", () => {
        render(<input type="text" defaultValue="John" />);

        const el = screen.getByRole("textbox");

        expect(el).toHaveDisplayValue("John");
        expect(el).toHaveDisplayValue(/jo/i);
      });

      test("number", () => {
        render(<input type="number" defaultValue="5" />);

        const el = screen.getByRole("spinbutton");

        expect(el).toHaveDisplayValue("5");
      });

      test("textarea", () => {
        render(<textarea defaultValue="Example" />);

        const el = screen.getByRole("textbox");

        expect(el).toHaveDisplayValue("Example");
        expect(el).toHaveDisplayValue(/ex/i);
      });

      test("single select", () => {
        render(
          <select defaultValue="2">
            <option value="1">Example 1</option>
            <option value="2">Example 2</option>
          </select>
        );

        const el = screen.getByRole("combobox");
        expect(el).toHaveDisplayValue("Example 2");
        expect(el).toHaveDisplayValue(/2/);
      });

      test("multiple select", () => {
        render(
          <select multiple defaultValue={["1", "2"]}>
            <option value="1">Example 1</option>
            <option value="2">Example 2</option>
          </select>
        );

        const el = screen.getByRole("listbox");
        expect(el).toHaveDisplayValue(["Example 1", /2/]);
      });
    });

    // TODO: add more input types
    test("form values", () => {
      render(
        <form data-testid="login-form">
          <input type="text" name="username" defaultValue="jane.doe" />
          <input type="password" name="password" defaultValue="12345678" />
          <input type="checkbox" name="rememberMe" defaultChecked />
          <button type="submit">Sign in</button>
        </form>
      );

      expect(screen.getByTestId("login-form")).toHaveFormValues({
        username: "jane.doe",
        rememberMe: true,
      });
    });

    describe("checked", () => {
      test("input checked", () => {
        render(<input type="checkbox" defaultChecked />);

        const el = screen.getByRole("checkbox");

        expect(el).toBeChecked();
      });

      test("radio checked", () => {
        render(<input type="radio" defaultChecked value="a" />);

        const el = screen.getByRole("radio");

        expect(el).toBeChecked();
      });

      test("div checkbox checked", () => {
        render(<div role="checkbox" aria-checked="true" />);

        const el = screen.getByRole("checkbox");

        expect(el).toBeChecked();
      });

      test("div switch checked", () => {
        render(<div role="switch" aria-checked="true" />);

        const el = screen.getByRole("switch");

        expect(el).toBeChecked();
      });

      test.each([
        {
          Component: <input type="checkbox" />,
          role: "checkbox",
        },
        {
          Component: <input type="radio" value="a" />,
          role: "radio",
        },
        {
          Component: <div role="checkbox" aria-checked="false" />,
          role: "checkbox",
        },
        {
          Component: <div role="switch" aria-checked="false" />,
          role: "switch",
        },
      ])("$role to be unchecked", ({ Component, role }) => {
        render(Component);

        const el = screen.getByRole(role);

        expect(el).not.toBeChecked();
      });
    });

    describe("partially checked", () => {
      test("aria-checked mixed", () => {
        render(<input type="checkbox" aria-checked="mixed" />);

        const el = screen.getByRole("checkbox");

        expect(el).toBePartiallyChecked();
      });

      test("setting indeterminate", () => {
        render(<input type="checkbox" />);

        const el = screen.getByRole("checkbox");
        el.indeterminate = true;

        expect(el).toBePartiallyChecked();
      });

      test("not partially checked", () => {
        render(
          <>
            <input type="checkbox" defaultChecked />
            <input type="checkbox" />
          </>
        );

        const elChecked = screen.getByRole("checkbox", { checked: true });
        const elUnchecked = screen.getByRole("checkbox", { checked: true });

        expect(elChecked).not.toBePartiallyChecked();
        expect(elUnchecked).not.toBePartiallyChecked();
      });
    });
  });

  test("error message", () => {
    render(
      <>
        <label htmlFor="startTime">
          Please enter a start time for the meeting:
        </label>
        <input
          id="startTime"
          type="text"
          aria-errormessage="msgID"
          aria-invalid="true"
          defaultValue="11:30 PM"
        />
        <span
          id="msgID"
          aria-live="assertive"
          style={{ visibility: "visible" }}
        >
          Invalid time: the time must be between 9:00 AM and 5:00 PM
        </span>
      </>
    );

    const timeInput = screen.getByLabelText(/start time/);

    expect(timeInput).toHaveErrorMessage(
      "Invalid time: the time must be between 9:00 AM and 5:00 PM"
    );
    expect(timeInput).toHaveErrorMessage(/invalid time/i); // to partially match
    expect(timeInput).toHaveErrorMessage(
      expect.stringContaining("Invalid time")
    ); // to partially match
    expect(timeInput).not.toHaveErrorMessage("Pikachu!");
  });
});
