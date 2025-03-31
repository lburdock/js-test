import { render, screen } from "@testing-library/react";
import {
  TID,
  formatComponentTests,
} from "../../__internal__/format-component-tests";

const FORM_COMPONENTS = formatComponentTests([
  {
    component: <input type="text" name="username" defaultValue="jane.doe" />,
    values: { username: "jane.doe" },
  },
  {
    component: (
      <input type="password" name="password" defaultValue="12345678" />
    ),
    values: { password: "12345678" },
  },
  {
    component: <input type="number" name="age" defaultValue="42" />,
    values: { age: 42 },
  },
  {
    component: <input type="checkbox" name="terms" defaultChecked />,
    values: { terms: true },
  },
  {
    component: <textarea name="notes" defaultValue="Yay" />,
    values: { notes: "Yay" },
  },
  {
    component: (
      <>
        <input type="radio" name="vehicle" value="car" defaultChecked />
        <input type="radio" name="vehicle" value="bike" />
      </>
    ),
    values: { vehicle: "car" },
  },
  {
    // Single select
    component: (
      <select name="vehicle" value="bike">
        <option value="car">Car</option>
        <option value="bike">Bike</option>
      </select>
    ),
    values: { vehicle: "bike" },
  },
  {
    // Multiple select
    component: (
      <select multiple name="vehicle" value={["car", "bike"]}>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="bus">Bus</option>
      </select>
    ),
    values: { vehicle: ["car", "bike"] },
  },
]);

describe("toHaveFormValues", () => {
  test.each(FORM_COMPONENTS)("$info", ({ component, values }) => {
    render(<form data-testid={TID}>{component}</form>);

    const el = screen.getByTestId(TID);

    expect(el).toHaveFormValues(values);
  });
});
