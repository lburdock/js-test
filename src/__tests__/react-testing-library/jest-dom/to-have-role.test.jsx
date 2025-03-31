import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const COMPONENTS = formatComponentTests([
  {
    component: (
      <a href="/about" data-testid={TID}>
        About
      </a>
    ),
    roles: ["link"],
  },
  {
    component: <button data-testid={TID}>Save</button>,
    roles: ["button"],
  },
  {
    component: (
      <button role="switch button" data-testid={TID}>
        Save
      </button>
    ),
    roles: ["switch", "button"],
  },
  {
    component: (
      <div role="switch button" data-testid={TID}>
        Save
      </div>
    ),
    roles: ["switch", "button"],
  },
]);

describe("toHaveRole", () => {
  test.each(COMPONENTS)("$info", ({ component, roles }) => {
    render(component);

    const el = screen.getByTestId(TID);

    roles.forEach(role => {
      expect(el).toHaveRole(role);
    });
  });
});

const WRONG_ROLE_COMPONENTS = formatComponentTests([
  {
    component: <a data-testid={TID}>About</a>, // missing href
    role: "link",
  },
  {
    component: (
      <button role="switch" data-testid={TID}>
        Save
      </button>
    ),
    role: "button",
  },
]);

describe("not.toHaveRole", () => {
  test.each(WRONG_ROLE_COMPONENTS)("$info", ({ component, role }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).not.toHaveRole(role);
  });
});
