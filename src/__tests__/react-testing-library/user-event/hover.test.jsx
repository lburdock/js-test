import { useEffect, useState, useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const HoverText = () => {
  const ref = useRef(null);
  const [buttonText, setButtonText] = useState("initial");

  useEffect(() => {
    ref.current.addEventListener("mouseover", () => setButtonText("mouseover"));
    ref.current.addEventListener("mouseout", () => setButtonText("mouseout"));
  }, []);

  return <button ref={ref}>{buttonText}</button>;
};

describe("Hover", () => {
  test("hover/unhover", async () => {
    const user = userEvent.setup();
    render(<HoverText />);

    const button = screen.getByRole("button");

    expect(screen.getByText("initial")).toBeInTheDocument();

    await user.hover(button);
    expect(screen.getByText("mouseover")).toBeInTheDocument();

    await user.unhover(button);
    expect(screen.getByText("mouseout")).toBeInTheDocument();
  });
});
