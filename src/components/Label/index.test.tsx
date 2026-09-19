import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Label, { type LabelProps } from "@/components/Label";
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

const renderLabelComponent = (
  props?: LabelProps,
) => {
  return render(() => (
    <Label {...props}>
      Username
    </Label>
  ));
};

describe("Label component", () => {
  it("should render the label", () => {
    const mockProps = {
      "data-testId": "label-test-id",
      for: "input-id",
    };
    renderLabelComponent(mockProps);
    const labelElement = screen.getByTestId(mockProps["data-testId"]);
    expect(labelElement).toHaveTextContent("Username");
    expect(labelElement.tagName.toLowerCase()).toBe("label");
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveClass(
      "block",
      theme.colors.default.ghost.text,
    );
  });

  /** class prop */
  it("should apply custom class to label element", () => {
    const mockProps = {
      "data-testId": "label-test-id",
      class: "test-class",
    };
    renderLabelComponent(mockProps);
    const labelElement = screen.getByTestId(mockProps["data-testId"]);
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveClass(mockProps.class);
  });

    /** color prop */
  colors.forEach((color) => {
    it(`should render label with color=${color}`, () => {
      const mockProps = {
        "data-testId": "label-test-id",
        color,
      };
      renderLabelComponent(mockProps);
      const labelElement = screen.getByTestId(mockProps["data-testId"]);
      expect(labelElement).toBeVisible();
      expect(labelElement).toHaveClass(
        theme.colors[color].ghost.text,
      );
    });
  });

  /** disabled prop */
  it("should display label with disabled styles", () => {
    const mockProps = {
      "data-testId": "label-test-id",
      disabled: true,
    };
    renderLabelComponent(mockProps);
    const labelElement = screen.getByTestId(mockProps["data-testId"]);
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveClass(
      theme.disabled.text,
    );
  });

  /** for prop */
  it("should apply for attribute to label", () => {
    const mockProps = {
      "data-testId": "label-test-id",
      for: "input-id",
    };
    renderLabelComponent(mockProps);
    const labelElement = screen.getByTestId(mockProps["data-testId"]);
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveAttribute("for", mockProps.for);
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render label with size=${size}`, () => {
      const mockProps = {
        "data-testId": "label-test-id",
        size,
      };
      renderLabelComponent(mockProps);
      const labelElement = screen.getByTestId(mockProps["data-testId"]);
      expect(labelElement).toBeVisible();
      switch(size) {
        case "small":
          expect(labelElement).toHaveClass(
            "text-sm",
          );
          break;
        case "medium":
          expect(labelElement).toHaveClass(
            "text-sm",
          );
          break;
        case "large":
          expect(labelElement).toHaveClass(
            "text-md",
          );
          break;
      }
    });
  });

  /** truncate prop */
  it("should apply truncation styles to label", () => {
    const mockProps = {
      "data-testId": "label-test-id",
      for: "input-id",
      truncate: true,
    };
    renderLabelComponent(mockProps);
    const labelElement = screen.getByTestId(mockProps["data-testId"]);
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveClass("truncate");
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          ghost: {
            text: customClass,
          },
        },
      },
    });
    const mockProps = {
      "data-testId": "label-test-id",
      for: "input-id",
    };
    render(() => (
      <ThemeProvider theme={theme}>
        <Label {...mockProps}>
          Username
        </Label>
      </ThemeProvider>
    ));
    const labelElement = screen.getByTestId(mockProps["data-testId"]);
    expect(labelElement).toBeVisible();
    expect(labelElement).toHaveClass(customClass);
  });
});