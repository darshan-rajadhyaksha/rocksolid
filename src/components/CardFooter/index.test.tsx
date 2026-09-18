import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import CardFooter, { type CardFooterProps } from "@/components/CardFooter";

const renderCardFooterComponent = (
  props?: CardFooterProps
) => {
  return render(() => (
    <CardFooter {...props} />
  ));
};

describe("CardFooter component", () => {
  it("should render the card footer", () => {
    const mockProps = {
      "data-testId": "card-footer-test-id",
      children: "Hello World",
    };
    renderCardFooterComponent(mockProps);
    const cardFooterElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardFooterElement).toBeVisible();
    expect(cardFooterElement).toHaveTextContent(mockProps.children);
    expect(cardFooterElement).toHaveClass(
      "flex",
      "items-center", 
      "gap-2",
      "px-4",
      "pt-3",
      "pb-4",
    );
  });

  /** class prop */
  it("should apply custom class to card footer element", () => {
    const mockProps = {
      "data-testId": "card-footer-test-id",
      class: "test-class",
    };
    renderCardFooterComponent(mockProps);
    const cardFooterElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardFooterElement).toBeVisible();
    expect(cardFooterElement).toHaveClass(mockProps.class);
  });
});