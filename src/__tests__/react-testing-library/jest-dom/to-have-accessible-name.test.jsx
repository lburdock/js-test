import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const NAMED_COMPONENTS = formatComponentTests([
  {
    component: (
      <a href="/" data-testid={TID}>
        Start
      </a>
    ),
    name: "Start",
  },
  {
    component: (
      <a href="/" title="Start over" data-testid={TID}>
        Start
      </a>
    ),
    name: "Start", // Ignores title
  },
  {
    component: (
      <a href="/" aria-label="Home page" title="Start over" data-testid={TID}>
        Start
      </a>
    ),
    name: "Home page",
  },

  { component: <input title="Name" data-testid={TID} />, name: "Name" },
  {
    component: <img src="logo.jpg" alt="Company logo" data-testid={TID} />,
    name: "Company logo",
  },
  {
    component: (
      <svg data-testid={TID}>
        <title>Company logo</title>
        <circle cx="50" cy="50" r="50" />
      </svg>
    ),
    name: "Company logo",
  },
  {
    component: (
      <button type="button" data-testid={TID}>
        <img src="logo.jpg" alt="Company logo" />
      </button>
    ),
    name: "Company logo",
  },
  {
    component: (
      <button type="button" data-testid={TID}>
        <svg>
          <title>Company logo</title>
          <circle cx="50" cy="50" r="50" />
        </svg>
      </button>
    ),
    name: "Company logo",
  },
]);

describe("toHaveAccessibleName", () => {
  test.each(NAMED_COMPONENTS)("$info", ({ component, name }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toHaveAccessibleName();
    expect(el).toHaveAccessibleName(name);
  });
});

const UNNAMED_COMPONENTS = formatComponentTests([
  <img src="logo.jpg" alt="" data-testid={TID} />,
  <svg data-testid={TID}>
    <circle cx="50" cy="50" r="50" />
  </svg>,
]);

describe("not.toHaveAccessibleName", () => {
  test.each(UNNAMED_COMPONENTS)("$info", ({ component }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toHaveAccessibleName();
  });
});
