import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Editor from "../components/Editor";

describe("Editor", () => {
  it("renders", () => {
    render(<Editor />);
    expect(screen.getByTestId("Editor")).toBeDefined();
  });
});
