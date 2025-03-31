import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const Toggle = ({ children, open = false }) => {
  const [show, setShow] = useState(open);

  const onClick = () => {
    // Arbitrary use of setTimeout to force `getByText` to fail
    setTimeout(() => {
      setShow(prev => !prev);
    }, 1000);
  };

  return (
    <>
      <button onClick={onClick} type="button">
        {show ? "Hide" : "Show"}
      </button>
      {show && <div>{children}</div>}
    </>
  );
};

describe("Button", () => {
  describe("Renders button and hidden content on click", () => {
    test("getBy", async () => {
      const user = userEvent.setup();
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).not.toBeInTheDocument();
      const button = screen.getByRole("button", { name: "Show" });

      await user.click(button);

      // This fails because it takes 1 second to show the text
      expect(() => screen.getByText("Content")).toThrow();
      expect(() => screen.getByRole("button", { name: "Hide" })).toThrow();
    });

    test("PREFERRED: findBy", async () => {
      const user = userEvent.setup();
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).not.toBeInTheDocument();
      const button = screen.getByRole("button", { name: "Show" });

      await user.click(button);

      // Use `findBy` instead of `getBy` to wait for the text to appear
      await expect(screen.findByText("Content")).resolves.toBeInTheDocument();
      await expect(
        screen.findByRole("button", { name: "Hide" }),
      ).resolves.toBeInTheDocument();
    });

    test("NOT RECOMMENDED: waitFor/getBy", async () => {
      const user = userEvent.setup();
      render(<Toggle>Content</Toggle>);

      expect(screen.queryByText("Content")).not.toBeInTheDocument();

      expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();

      await user.click(screen.getByRole("button"));

      // `findBy` is equivalent to using `waitFor` with `getBy`
      /* eslint-disable testing-library/prefer-find-by */
      await waitFor(() =>
        expect(screen.getByText("Content")).toBeInTheDocument(),
      );
      await waitFor(() =>
        expect(
          screen.getByRole("button", { name: "Hide" }),
        ).toBeInTheDocument(),
      );
      /* eslint-enable */
    });
  });
});
