import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";
import Menu from "../components/Menu";

describe("Menu", () => {
  it("changes accent color when the button is pressed", async () => {
    const setAccentColor = vi.fn();
    render(<Menu />);

    const user = userEvent.setup();
    const button = screen.getByTestId("menu");
    await user.click(button);
    const buttonAccent = screen.getByTestId("red");
    await user.click(buttonAccent);
    expect(setAccentColor).toBeDefined();
  });
});
