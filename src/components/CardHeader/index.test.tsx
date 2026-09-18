import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import CardHeader, { type CardHeaderProps } from "@/components/CardHeader";

const renderCardHeaderComponent = (
  props?: CardHeaderProps
) => {
  return render(() => (
    <CardHeader {...props} />
  ));
};

describe("CardHeader component", () => {
  it("should render the card header", () => {
    const mockProps = {
      "data-testId": "card-header-test-id",
      children: "Hello World",
    };
    renderCardHeaderComponent(mockProps);
    const cardHeaderElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardHeaderElement).toBeVisible();
    expect(cardHeaderElement).toHaveTextContent(mockProps.children);
    expect(cardHeaderElement).toHaveClass(
      "px-4",
      "pt-4",
      "pb-2",
    );
  });

  /** class prop */
  it("should apply custom class to card header element", () => {
    const mockProps = {
      "data-testId": "card-header-test-id",
      class: "test-class",
    };
    renderCardHeaderComponent(mockProps);
    const cardHeaderElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardHeaderElement).toBeVisible();
    expect(cardHeaderElement).toHaveClass(mockProps.class);
  });
});