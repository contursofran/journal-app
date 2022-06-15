import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Calendar from "../components/Calendar";

describe("Calendar", () => {
  it("renders", () => {
    render(<Calendar />);
    expect(screen.getByTestId("calendar")).toBeDefined();
  });
});
