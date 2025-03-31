import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const FORM_COMPONENTS = formatComponentTests([
  {
    component: (
      <input
        type="text"
        name="username"
        defaultValue="jane.doe"
        data-testid={TID}
      />
    ),
    value: "jane.doe",
  },
  {
    component: (
      <input
        type="password"
        name="password"
        defaultValue="12345678"
        data-testid={TID}
      />
    ),
    value: "12345678",
  },
  {
    component: (
      <input type="number" name="age" defaultValue="42" data-testid={TID} />
    ),
    value: 42,
  },
  {
    component: <textarea name="notes" defaultValue="Yay" data-testid={TID} />,
    value: "Yay",
  },

  {
    // Single select
    component: (
      <select name="vehicle" data-testid={TID}>
        <option value="car">Car</option>
        <option value="bike" selected>
          Bike
        </option>
      </select>
    ),
    value: "bike",
  },
  {
    // Multiple select
    component: (
      <select multiple name="vehicle" data-testid={TID}>
        <option value="car" selected>
          Car
        </option>
        <option value="bike" selected>
          Bike
        </option>
        <option value="bus">Bus</option>
      </select>
    ),
    value: ["car", "bike"],
  },
]);

// Can't use with checkbox or radio buttons
describe("toHaveValue", () => {
  test.each(FORM_COMPONENTS)("$info", ({ component, value }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toHaveValue(value);
  });
});
