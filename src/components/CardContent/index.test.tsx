import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import CardContent, { type CardContentProps } from "@/components/CardContent";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderCardContentComponent = (
  props?: CardContentProps,
) => {
  return render(() => (
    <CardContent {...props} />
  ));
};

describe("CardContent component", () => {
  it("should render the card content", () => {
    const mockProps = {
      "data-testId": "card-content-test-id",
      children: "Hello World",
    };
    renderCardContentComponent(mockProps);
    const cardContentElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardContentElement).toBeVisible();
    expect(cardContentElement).toHaveTextContent(mockProps.children);
    expect(cardContentElement).toHaveClass(
      "px-4",
      "py-2",
      theme.typography.variants.body2,
      theme.typography.colors.textSecondary,
    );
  });

  /** class prop */
  it("should apply custom class to card content element", () => {
    const mockProps = {
      "data-testId": "card-content-test-id",
      class: "test-class",
    };
    renderCardContentComponent(mockProps);
    const cardContentElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardContentElement).toBeVisible();
    expect(cardContentElement).toHaveClass(mockProps.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const mockProps = {
      "data-testId": "card-content-test-id",
      class: "test-class",
    };
    const theme = createTheme({
      typography: {
        colors: {
          textSecondary: customClass,
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <CardContent
          {...mockProps}
        >
          Hello World
        </CardContent>
      </ThemeProvider>
    ));
    const cardContentElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardContentElement).toBeVisible();
    expect(cardContentElement).toHaveClass(customClass);
  });
});