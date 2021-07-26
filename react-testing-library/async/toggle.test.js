import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "./toggle";

describe("Button", () => {
  describe("Renders button and hidden content on click", () => {
    test.skip("SKIPPED: getBy", () => {
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).toBeNull();
      expect(screen.getByRole("button", { name: "Show" }));

      userEvent.click(screen.getByRole("button"));

      // This fails because it takes 1 second to show the text
      expect(screen.getByText("Content"));
      expect(screen.getByRole("button", { name: "Hide" }));
    });

    test("PREFERRED: findBy", async () => {
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).toBeNull();
      expect(screen.getByRole("button", { name: "Show" }));

      userEvent.click(screen.getByRole("button"));

      // Use `findBy` instead of `getBy` to wait for the text to appear
      expect(await screen.findByText("Content"));
      expect(await screen.findByRole("button", { name: "Hide" }));
    });

    test("NOT RECOMMENDED: waitFor/getBy", async () => {
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).toBeNull();
      expect(screen.getByRole("button", { name: "Show" }));

      userEvent.click(screen.getByRole("button"));

      // `findBy` is equivalent to using `waitFor` with `getBy`
      await waitFor(() => {
        expect(screen.getByText("Content"));
        expect(screen.getByRole("button", { name: "Hide" }));
      });
    });
  });

  describe("Renders content initially and hides on click", () => {
    test("waitForElementToBeRemoved", async () => {
      render(<Toggle open>Content</Toggle>);

      expect(screen.getByText("Content"));
      expect(screen.getByRole("button", { name: "Hide" }));

      userEvent.click(screen.getByRole("button"));

      await waitForElementToBeRemoved(screen.queryByText("Content"));
      expect(await screen.findByRole("button", { name: "Show" }));
    });

    test("waitFor", async () => {
      render(<Toggle open>Content</Toggle>);

      expect(screen.getByText("Content"));
      expect(screen.getByRole("button", { name: "Hide" }));

      userEvent.click(screen.getByRole("button"));

      // You can use `waitFor` instead of `waitForElementToBeRemoved`
      await waitFor(() => {
        expect(screen.queryByText("Content")).toBeNull();
        expect(screen.getByRole("button", { name: "Show" }));
      });
    });
  });
});
