import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import IconButton, { type IconButtonProps } from "@/components/IconButton";
import InfoIcon from "@/components/icons/Info";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const colors = [
  "default",
  "success",
  "warning",
  "info",
  "error",
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const renderIconButtonComponent = (
  props?: IconButtonProps,
) => {
  return render(() => (
    <IconButton {...props}>
      <InfoIcon />
    </IconButton>
  ));
};

describe("IconButton component", () => {
  it("should render the icon-button", () => {
    renderIconButtonComponent();
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass(
      "px-0",
      "py-0",
      "min-h-[initial]",
      "inline-flex",
      "justify-center",
      "items-center",
      "shrink-0",
      theme.rounded.full,
      theme.focus,
    );
  });

  /** class prop */
  it("should apply custom class to icon-button element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderIconButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render icon-button with color=${color} and disabled=false`, () => {
      renderIconButtonComponent({
        color,
        disabled: false,
      });
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeVisible();
      /** Asset classes */
      expect(buttonElement).toHaveClass(
        theme.colors[color]["ghost"].background,
        theme.colors[color]["ghost"].border,
        theme.colors[color]["ghost"].hover,
        theme.colors[color]["ghost"].active,
        theme.colors[color]["ghost"].text,
      );
    });

    it(`should render icon-button with color=${color} and disabled=true`, () => {
      renderIconButtonComponent({
        color,
        disabled: true,
      });
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeVisible();
      // /** Asset classes */
      expect(buttonElement).toHaveClass(
        theme.disabled.text,
      );
    });
  });

  /** disabled prop */
  it("should disable the icon-button", () => {
    const mockProps = {
      disabled: true,
    };
    renderIconButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toBeDisabled();
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render icon-button with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderIconButtonComponent(mockProps);
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeVisible();
      switch(size) {
        case "small":
          expect(buttonElement).toHaveClass(
            "size-6",
            "text-lg",
          );
          break;
        case "medium":
          expect(buttonElement).toHaveClass(
            "size-8",
            "text-2xl",
          );
          break;
        case "large":
          expect(buttonElement).toHaveClass(
            "size-10",
            "text-3xl",
          );
          break;
      }
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          ghost: {
            background: customClass,
          }
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </ThemeProvider>
    ));
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass(customClass);
  });
});