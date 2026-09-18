import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Textarea, { type TextareaProps } from "@/components/Textarea";
import Label from "@/components/Label";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import userEvent from "@testing-library/user-event";

const colors = [
  "default",
  "success",
  "warning",
  "info",
  "error",
] as const;

const resizes = [
  "x",
  "y",
  "both",
  "none",
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const variants = [
  "filled",
  "outlined",
  "ghost",
] as const;

const renderTextareaComponent = (
  props?: TextareaProps,
) => {
  return render(() => (
    <div>
      <Label for="username">Username</Label>
      <Textarea 
        id="username"
        {...props}
      />
    </div>
  ));
};

describe("Textarea component", () => {
  it("should render the textarea", () => {
    renderTextareaComponent();
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toHaveClass(
      "outline-0",
      theme.rounded.small,
      theme.focus,
    );
  });

  /** class prop */
  it("should apply custom class to textarea element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderTextareaComponent(mockProps);
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render textarea with color=${color}, variant=${variant} and disabled=false`, () => {
        renderTextareaComponent({
          color,
          variant,
          disabled: false,
        });
        const textareaElement = screen.getByLabelText("Username");
        expect(textareaElement).toBeVisible();
        /** Asset classes */
        expect(textareaElement).toHaveClass(
          variant === "outlined" ? "border-1" : "",
          theme.colors[color][variant].background,
          theme.colors[color][variant].border,
          theme.colors[color][variant].text,
        );
      });
      it(`should render textarea with color=${color}, variant=${variant} and disabled=true`, () => {
        renderTextareaComponent({
          color,
          variant,
          disabled: true,
        });
        const textareaElement = screen.getByLabelText("Username");
        expect(textareaElement).toBeVisible();
        // /** Asset classes */
        expect(textareaElement).toHaveClass(
          theme.disabled.text,
        );
        if (variant === "filled") {
          expect(textareaElement).toHaveClass(
            theme.disabled.background,
          );
        }
        if (variant === "outlined") {
          expect(textareaElement).toHaveClass(
            "border-1",
            theme.disabled.border,
          );
        }
      });
    });
  });

  /** disabled prop */
  it("should disable the textarea", () => {
    const mockProps = {
      disabled: true,
    };
    renderTextareaComponent(mockProps);
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toBeDisabled();
  });

  /** fullWidth prop */
  it("should not apply full width to textarea", () => {
    const mockProps = {
      fullWidth: false,
    };
    renderTextareaComponent(mockProps);
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).not.toHaveClass("w-full");
  });

  it("should apply full width to textarea", () => {
    const mockProps = {
      fullWidth: true,
    };
    renderTextareaComponent(mockProps);
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toHaveClass("w-full");
  });

  /** value and onChange */
  it("should set value to textarea", () => {
    const mockProps = {
      value: "hello",
    };
    renderTextareaComponent(mockProps);
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toHaveValue(mockProps.value);
  });

  it("should call onInput callback when textarea value is changed", async () => {
    const mockProps = {
      value: "hello",
      onInput: vi.fn(),
    };
    renderTextareaComponent(mockProps);
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toHaveValue(mockProps.value);
    const typeText = "test";
    await userEvent.type(textareaElement, typeText);
    expect(textareaElement).toHaveValue(`${mockProps.value}${typeText}`);
    expect(mockProps.onInput).toHaveBeenCalledTimes(typeText.length);
  });

  /** resize prop */
  resizes.forEach((resize) => {
    it(`should set styles to textarea for resize=${resize}`, () => {
      const mockProps = {
        resize,
      };
      renderTextareaComponent(mockProps);
      const textareaElement = screen.getByLabelText("Username");
      expect(textareaElement).toBeVisible();
      switch(resize) {
        case "x":
          expect(textareaElement).toHaveClass("resize-x");
          break;
        case "y":
          expect(textareaElement).toHaveClass("resize-y");
          break;
        case "both":
          expect(textareaElement).toHaveClass("resize");
          break;
        case "none":
          expect(textareaElement).toHaveClass("resize-none");
          break;
      }
    });
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render textarea with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderTextareaComponent(mockProps);
      const textareaElement = screen.getByLabelText("Username");
      expect(textareaElement).toBeVisible();
      switch(size) {
        case "small":
          expect(textareaElement).toHaveClass(
            "py-1",
            "px-1.5",
            "h-10",
            "text-sm",
          );
          break;
        case "medium":
          expect(textareaElement).toHaveClass(
            "py-1",
            "px-1.5",
            "h-15",
            "text-sm",
          );
          break;
        case "large":
          expect(textareaElement).toHaveClass(
            "py-1.5",
            "px-2",
            "h-20",
            "text-md",
          );
          break;
      }
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "border-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          outlined: {
            border: customClass,
          }
        },
      }
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <div>
          <Label for="username">Username</Label>
          <Textarea 
            id="username"
          />
        </div>
      </ThemeProvider>
    ));
    const textareaElement = screen.getByLabelText("Username");
    expect(textareaElement).toBeVisible();
    expect(textareaElement).toHaveClass(customClass);
  });
});