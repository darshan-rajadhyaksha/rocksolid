import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Spinner, { type SpinnerProps } from "@/components/Spinner";
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

const renderSpinnerComponent = (
  props?: SpinnerProps,
) => {
  return render(() => (
    <Spinner {...props} />
  ));
};

describe("Spinner component", () => {
  it("should render the spinner", () => {
    renderSpinnerComponent();
    const spinnerElement = screen.getByRole("status", { name: "Loading" });
    expect(spinnerElement).toBeVisible();
    expect(spinnerElement).toHaveClass(
      "inline-flex",
      "items-center",
      "justify-center",
    );
    expect(
      spinnerElement.querySelector("svg")
    ).toHaveClass("animate-spin");
  });

  /** class prop */
  it("should apply custom class to spinner element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderSpinnerComponent(mockProps);
    const spinnerElement = screen.getByRole("status", { name: "Loading" });
    expect(spinnerElement).toBeVisible();
    expect(spinnerElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render spinner with color=${color}`, () => {
      const mockProps = {
        color,
      };
      renderSpinnerComponent(mockProps);
      const spinnerElement = screen.getByRole("status", { name: "Loading" });
      expect(spinnerElement).toBeVisible();
      expect(spinnerElement).toHaveClass(
        theme.colors[color].ghost.text,
      );
    });
  });

  /** label prop */
  it("should apply custom label to spinner element", () => {
    const mockProps = {
      label: "Loading content",
    };
    renderSpinnerComponent(mockProps);
    const spinnerElement = screen.getByRole("status", { name: mockProps.label });
    expect(spinnerElement).toBeVisible();
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render spinner with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderSpinnerComponent(mockProps);
      const spinnerElement = screen.getByRole("status", { name: "Loading" });
      expect(spinnerElement).toBeVisible();
      const svgElement = spinnerElement.querySelector("svg");
      switch(size) {
        case "small":
          expect(svgElement).toHaveClass(
            "size-4",
          );
          break;
        case "medium":
          expect(svgElement).toHaveClass(
            "size-6",
          );
          break;
        case "large":
          expect(svgElement).toHaveClass(
            "size-8",
          );
          break;
      }
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          ghost: {
            text: customClass,
          }
        },
      }
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Spinner />
      </ThemeProvider>
    ));
    const spinnerElement = screen.getByRole("status", { name: "Loading" });
    expect(spinnerElement).toBeVisible();
    expect(spinnerElement).toHaveClass(customClass);
  });
});