import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Typography, { type TypographyProps } from "@/components/Typography";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import type { ValidComponent } from "solid-js";

const aligns = [
  "inherit",
  "left",
  "center",
  "right",
  "justify",
] as const;

const colors = [
  "inherit",
  "default",
  "success",
  "warning",
  "info",
  "error",
  "textPrimary",
  "textSecondary",
  "textTertiary",
  "disabled",
] as const;

const variants = [
  "inherit",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body1",
  "body2",
  "code",
] as const;

const renderTypographyComponent = <T extends ValidComponent = "p">(
  props?: TypographyProps<T>,
) => {
  return render(() => (
    <Typography {...props}>
      Hello World
    </Typography>
  ));
};

describe("Typography component", () => {
  it("should render the typography", () => {
    renderTypographyComponent();
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
  });

  /** align prop */
  aligns.forEach((align) => {
    it(`should apply styles for align=${align}`, () => {
      const mockProps = {
        align,
      };
      renderTypographyComponent(mockProps);
      const typographyElement = screen.getByText("Hello World");
      expect(typographyElement).toBeVisible();
      switch(align) {
        case "left":
          expect(typographyElement).toHaveClass("text-left");
          break;
        case "right":
          expect(typographyElement).toHaveClass("text-right");
          break;
        case "center":
          expect(typographyElement).toHaveClass("text-center");
          break;
        case "justify":
          expect(typographyElement).toHaveClass("text-justify");
          break;
        case "inherit":
          expect(typographyElement).toHaveClass("[text-align:inherit]");
          break;
      }
    });
  });

  /** as prop */
  it("should render the typography component with 'kbd' element", () => {
    const mockProps = {
      as: "kbd" as const,
    };
    renderTypographyComponent<"kbd">(mockProps);
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
    expect(typographyElement.tagName.toLowerCase()).toBe(mockProps.as);
  });

  /** class prop */
  it("should apply custom class to typography element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTypographyComponent(mockProps);
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
    expect(typographyElement).toHaveClass(mockProps.class);
  });

    /** color prop */
  colors.forEach((color) => {
    it(`should render typography with color=${color}`, () => {
      const mockProps = {
        color,
      };
      renderTypographyComponent(mockProps);
      const typographyElement = screen.getByText("Hello World");
      expect(typographyElement).toBeVisible();
      switch(color) {
        case "default":
        case "success":
        case "warning":
        case "info":
        case "error":
          expect(typographyElement).toHaveClass(
            theme.colors[color].ghost.text,
          );
          break;   
        case "textPrimary":
        case "textSecondary":
        case "textTertiary":
          expect(typographyElement).toHaveClass(
            theme.typography.colors[color],
          );
          break;
        case "disabled":
          expect(typographyElement).toHaveClass(
            theme.disabled.text,
          );
          break;
        case "inherit":
          expect(typographyElement).toHaveClass(
            "text-inherit",
            "dark:text-inherit",
          );
          break;
      }
    });
  });

  /** truncate prop */
  it("should apply truncation styles to typography", () => {
    const mockProps = {
      truncate: true,
    };
    renderTypographyComponent(mockProps);
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
    expect(typographyElement).toHaveClass("truncate");
  });

  /** variant prop */
  variants.forEach((variant) => {
    it(`should apply styles for variant=${variant}`, () => {
      const mockProps = {
        variant,
      };
      renderTypographyComponent(mockProps);
      const typographyElement = screen.getByText("Hello World");
      expect(typographyElement).toBeVisible();
      expect(typographyElement).toHaveClass(
        theme.typography.variants[variant],
      );
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "font-semibold";
    const theme = createTheme({
      typography: {
        variants: {
          body2: customClass,
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Typography>
          Hello World
        </Typography>
      </ThemeProvider>
    ));
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
    expect(typographyElement).toHaveClass(customClass);
  });
});