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
  describe("Showing content", () => {
    test.skip("renders button and hidden content on click - getBy", () => {
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).toBeNull();
      expect(screen.getByRole("button", { name: "Show" }));

      userEvent.click(screen.getByRole("button"));

      // This fails because it takes 1 second to show the text
      expect(screen.getByText("Content"));
      expect(screen.getByRole("button", { name: "Hide" }));
    });

    test("renders button and hidden content on click - findBy", async () => {
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).toBeNull();
      expect(screen.getByRole("button", { name: "Show" }));

      userEvent.click(screen.getByRole("button"));

      // Use `findBy` instead of `getBy` to wait for the text to appear
      expect(await screen.findByText("Content"));
      expect(await screen.findByRole("button", { name: "Hide" }));
    });

    test("renders button and hidden content on click - waitFor/getBy", async () => {
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

    xtest("demo test", async () => {
      const mockFetch = jest.fn().mockResolvedValue("Content");
      render(<Toggle onFetch={mockFetch} />);

      expect(screen.getByRole("button", { name: "Show" }));

      userEvent.click(screen.getByRole("button"));

      await waitFor(() => expect(mockFetch).toHaveBeenCalled());
      expect(await screen.findByText("Content"));

      userEvent.click(screen.getByRole("button", { name: "Hide" }));

      await waitForElementToBeRemoved(screen.queryByText("Content"));
    });
  });

  describe("Hiding content", () => {
    test("renders content initially and hides on click - waitForElementToBeRemoved", async () => {
      render(<Toggle open>Content</Toggle>);

      expect(screen.getByText("Content"));
      expect(screen.getByRole("button", { name: "Hide" }));

      userEvent.click(screen.getByRole("button"));

      await waitForElementToBeRemoved(screen.queryByText("Content"));
      expect(await screen.findByRole("button", { name: "Show" }));
    });

    test("renders content initially and hides on click - waitFor", async () => {
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
