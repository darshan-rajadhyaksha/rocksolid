import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Backdrop, { type BackdropProps } from "./Backdrop";

const renderBackdropComponent = (
  props?: BackdropProps
) => {
  return render(() => (
    <Backdrop {...props} />
  ));
};

describe("Backdrop component", () => {
  it("should render the backdrop component", () => {
    const mockProps = {
      "data-testId": "backdrop-test-id",
      class: "test-class",
    };
    renderBackdropComponent(mockProps);
    const backdropElement = screen.getByTestId(mockProps["data-testId"]);
    expect(backdropElement).toBeVisible();
    expect(backdropElement).toHaveClass(
      "fixed",
      "inset-0",
      "w-full",
      "h-full",
      "z-50",
      "flex",
      "justify-center",
      "items-center",
      "bg-black/50",
      "backdrop-blur-sm",
    );
  });

  /** class prop */
  it("should set custom class to backdrop component", () => {
    const mockProps = {
      "data-testId": "backdrop-test-id",
      class: "test-class",
    };
    renderBackdropComponent(mockProps);
    const backdropElement = screen.getByTestId(mockProps["data-testId"]);
    expect(backdropElement).toBeVisible();
    expect(backdropElement).toHaveClass(mockProps.class);
  });
});