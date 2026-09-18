import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import type { ValidComponent } from "solid-js";
import CardTitle, { type CardTitleProps } from "@/components/CardTitle";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderCardTitleComponent = <T extends ValidComponent>(
  props?: CardTitleProps<T>
) => {
  return render(() => (
    <CardTitle {...props} />
  ));
};

describe("CardTitle component", () => {
  it("should render the card title", () => {
    const mockProps = {
      children: "Hello World",
    };
    renderCardTitleComponent(mockProps);
    const cardTitleElement = screen.getByRole("heading");
    expect(cardTitleElement).toBeVisible();
    expect(cardTitleElement).toHaveTextContent(mockProps.children);
    expect(cardTitleElement).toHaveClass(
      theme.typography.variants.h5,
      theme.typography.colors.textPrimary,
    );
  });

  /** as prop */
  it("should render the card title component with 'h4' element", () => {
    const mockProps = {
      as: "h4" as const,
      children: "Hello World",
    };
    renderCardTitleComponent(mockProps);
    const cardTitleElement = screen.getByRole("heading");
    expect(cardTitleElement).toBeVisible();
    expect(cardTitleElement.tagName.toLowerCase()).toBe(mockProps.as);
  });

  /** class prop */
  it("should apply custom class to card title element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderCardTitleComponent(mockProps);
    const cardTitleElement = screen.getByRole("heading");
    expect(cardTitleElement).toBeVisible();
    expect(cardTitleElement).toHaveClass(mockProps.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      typography: {
        colors: {
          textPrimary: customClass,
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <CardTitle>
          Hello World
        </CardTitle>
      </ThemeProvider>
    ));
    const cardTitleElement = screen.getByRole("heading");
    expect(cardTitleElement).toBeVisible();
    expect(cardTitleElement).toHaveClass(customClass);
  });
});