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
    regex: /\.doe/gi,
  },
  {
    component: <textarea name="notes" defaultValue="Yay" data-testid={TID} />,
    value: "Yay",
    regex: /yay/gi,
  },

  {
    // Single select
    component: (
      <select name="vehicle" data-testid={TID}>
        <option value="">Select...</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
      </select>
    ),
    value: "Select...",
    regex: /select/gi,
  },
  {
    // Multiple select
    component: (
      <select multiple name="vehicle" value={["car", "bike"]} data-testid={TID}>
        <option value="">Select...</option>
        <option value="car">Car</option>
        <option value="bike">Bike</option>
        <option value="bus">Bus</option>
      </select>
    ),
    value: ["Car", "Bike"],
    regex: [/car/gi, /bike/gi],
  },
]);

// toHaveDisplayValue(value: string | RegExp | (string|RegExp)[])
describe("toHaveDisplayValue", () => {
  test.each(FORM_COMPONENTS)("$info", ({ component, value, regex }) => {
    render(component);

    const el = screen.getByTestId(TID);

    expect(el).toHaveDisplayValue(regex);
    expect(el).toHaveDisplayValue(value);
  });
});
