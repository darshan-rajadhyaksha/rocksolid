import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import CardDescription, { type CardDescriptionProps } from "@/components/CardDescription";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderCardDescriptionComponent = (
  props?: CardDescriptionProps
) => {
  return render(() => (
    <CardDescription {...props} />
  ));
};

describe("CardDescription component", () => {
  it("should render the card description", () => {
    const mockProps = {
      "data-testId": "card-description-test-id",
      children: "Hello World",
    };
    renderCardDescriptionComponent(mockProps);
    const cardDescriptionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardDescriptionElement).toBeVisible();
    expect(cardDescriptionElement).toHaveTextContent(mockProps.children);
    expect(cardDescriptionElement).toHaveClass(
      "pt-1",
      theme.typography.variants.body2,
      theme.typography.colors.textSecondary,
    );
  });

  /** class prop */
  it("should apply custom class to card description element", () => {
    const mockProps = {
      "data-testId": "card-description-test-id",
      class: "test-class",
    };
    renderCardDescriptionComponent(mockProps);
    const cardDescriptionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardDescriptionElement).toBeVisible();
    expect(cardDescriptionElement).toHaveClass(mockProps.class);
  });

  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const mockProps = {
      "data-testId": "card-description-test-id",
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
        <CardDescription
          {...mockProps}
        >
          Hello World
        </CardDescription>
      </ThemeProvider>
    ));
    const cardDescriptionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardDescriptionElement).toBeVisible();
    expect(cardDescriptionElement).toHaveClass(customClass);
  });
});