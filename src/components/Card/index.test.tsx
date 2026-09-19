import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Card, { type CardProps } from "@/components/Card";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const variants = [
  "filled",
  "elevated",
  "outlined",
  "ghost",
] as const;

const renderCardComponent = (
  props?: CardProps & WithExtendedComponentProps,
) => {
  return render(() => (
    <Card {...props as CardProps} />
  ));
};

describe("Card component", () => {
  it("should render the card", () => {
    const mockProps = {
      "data-testId": "card-test-id",
    };
    renderCardComponent(mockProps);
    const cardElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardElement).toBeVisible();
    expect(cardElement).toHaveClass(
      theme.rounded.small,
    );
  });

  /** class prop */
  it("should apply custom class to card element", () => {
    const mockProps = {
      "data-testId": "card-test-id",
      class: "test-class",
    };
    renderCardComponent(mockProps);
    const cardElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardElement).toBeVisible();
    expect(cardElement).toHaveClass(mockProps.class);
  });

  /** variants prop */
  variants.forEach((variant) => {
    it(`should apply styles to card for variant=${variant}`, () => {
      const mockProps = {
        "data-testId": "card-test-id",
        variant,
      };
      renderCardComponent(mockProps);
      const cardElement = screen.getByTestId(mockProps["data-testId"]);
      expect(cardElement).toBeVisible();
      switch(variant) {
        case "filled":
          expect(cardElement).toHaveClass(
            "bg-neutral-100",
            "dark:bg-neutral-900",
            theme.typography.colors.textSecondary,
            theme.shadow.small,
          );
          break;
        case "elevated":
          expect(cardElement).toHaveClass(
            "bg-white",
            "dark:bg-neutral-800",
            "dark:border dark:border-white/10",
            theme.shadow.medium,
          );
          break;
        case "outlined":
          expect(cardElement).toHaveClass(
            "bg-transparent",
            "border",
            "overflow-hidden",
            theme.divider,
          );
          break;
        case "ghost":
          expect(cardElement).toHaveClass(
            "bg-transparent",
          );
          break;
      }
    });
  });

  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "rounded-[2px]";
    const mockProps = {
      "data-testId": "card-test-id",
    };
    const theme = createTheme({
      rounded: {
        small: customClass,
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Card
          {...mockProps}
        >
          Hello
        </Card>
      </ThemeProvider>
    ));
    const cardElement = screen.getByTestId(mockProps["data-testId"]);
    expect(cardElement).toBeVisible();
    expect(cardElement).toHaveClass(customClass);
  });
});