import { expect, describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorSchemeProvider } from "@mantine/core";
import { Header } from "../layouts/Header";

describe("Header", () => {
  it("renders", () => {
    render(
      <ColorSchemeProvider colorScheme="dark" toggleColorScheme={() => {}}>
        <Header />
      </ColorSchemeProvider>
    );
    expect(screen.getByTestId("Header")).toBeDefined();
  });
  it("renders with light theme", () => {
    render(
      <ColorSchemeProvider colorScheme="light" toggleColorScheme={() => {}}>
        <Header />
      </ColorSchemeProvider>
    );
    expect(screen.getByTestId("Header")).toBeDefined();
  });
  it("changes theme when the button is pressed", async () => {
    const toggleColorScheme = vi.fn();
    render(
      <ColorSchemeProvider
        colorScheme="dark"
        toggleColorScheme={toggleColorScheme}
      >
        <Header />
      </ColorSchemeProvider>
    );

    const user = userEvent.setup();
    const button = screen.getByTestId("change-theme");
    await user.click(button);
    expect(toggleColorScheme).toHaveBeenCalled();
  });
});
