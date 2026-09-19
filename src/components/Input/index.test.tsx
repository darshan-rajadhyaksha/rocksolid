import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Input, { type InputProps } from "@/components/Input";
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

const renderInputComponent = (
  props?: InputProps,
) => {
  return render(() => (
    <div>
      <Label for="username">Username</Label>
      <Input 
        id="username"
        {...props}
      />
    </div>
  ));
};

describe("Input component", () => {
  it("should render the input", () => {
    renderInputComponent({
      prefix: "https://",
      suffix: ".com",
    });
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement.parentElement).toHaveClass(
      "inline-flex",
      "items-center",
      "overflow-hidden",
      theme.rounded.small,
      theme.focusWithin,
    );
    // Prefix slot
    expect(inputElement.previousElementSibling).toHaveClass(
      "leading-[1]",
      "shrink-0",
      "ps-1.5",
      "pe-1",
    );
    // Suffix slot
    expect(inputElement.nextElementSibling).toHaveClass(
      "leading-[1]",
      "shrink-0",
      "ps-1",
      "pe-1.5",
    );
  });

  /** class prop */
  it("should apply custom class to input element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render input with color=${color}, variant=${variant} and disabled=false`, () => {
        renderInputComponent({
          color,
          variant,
          disabled: false,
          prefix: "https://",
          suffix: ".com",
        });
        const inputElement = screen.getByLabelText("Username");
        expect(inputElement).toBeVisible();
        /** Asset classes */
        expect(inputElement.parentElement).toHaveClass(
          variant === "outlined" ? "border-1" : "",
          theme.colors[color][variant].background,
          theme.colors[color][variant].border,
          theme.colors[color][variant].text,
        );
        // Prefix slot
        expect(inputElement.previousElementSibling).toHaveClass(
          theme.colors[color][variant].text,
        );
        // Suffix slot
        expect(inputElement.nextElementSibling).toHaveClass(
          theme.colors[color][variant].text,
        );
      });
      it(`should render input with color=${color}, variant=${variant} and disabled=true`, () => {
        renderInputComponent({
          color,
          variant,
          disabled: true,
          prefix: "https://",
          suffix: ".com",
        });
        const inputElement = screen.getByLabelText("Username");
        expect(inputElement).toBeVisible();
        // /** Asset classes */
        expect(inputElement.parentElement).toHaveClass(
          theme.disabled.text,
        );
        // Prefix slot
        expect(inputElement.previousElementSibling).toHaveClass(
          theme.disabled.text,
        );
        // Suffix slot
        expect(inputElement.nextElementSibling).toHaveClass(
          theme.disabled.text,
        );
        if (variant === "filled") {
          expect(inputElement.parentElement).toHaveClass(
            theme.disabled.background,
          );
        }
        if (variant === "outlined") {
          expect(inputElement.parentElement).toHaveClass(
            "border-1",
            theme.disabled.border,
          );
        }
      });
    });
  });

  /** disabled prop */
  it("should disable the input", () => {
    const mockProps = {
      disabled: true,
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement).toBeDisabled();
  });

  /** fullWidth prop */
  it("should not apply full width to input", () => {
    const mockProps = {
      fullWidth: false,
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement.parentElement).not.toHaveClass("w-full");
  });

  it("should apply full width to input", () => {
    const mockProps = {
      fullWidth: true,
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement.parentElement).toHaveClass("w-full");
  });

  /** inputSize prop */
  it("should set size of the input", () => {
    const mockProps = {
      inputSize: 10,
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveAttribute("size", `${mockProps.inputSize}`);
  });

  /** value and onChange */
  it("should set value to input", () => {
    const mockProps = {
      value: "hello",
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveValue(mockProps.value);
  });

  it("should call onInput callback when input value is changed", async () => {
    const mockProps = {
      value: "hello",
      onInput: vi.fn(),
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveValue(mockProps.value);
    const typeText = "test";
    await userEvent.type(inputElement, typeText);
    expect(inputElement).toHaveValue(`${mockProps.value}${typeText}`);
    expect(mockProps.onInput).toHaveBeenCalledTimes(typeText.length);
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render input with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderInputComponent(mockProps);
      const inputElement = screen.getByLabelText("Username");
      expect(inputElement).toBeVisible();
      switch(size) {
        case "small":
          expect(inputElement.parentElement).toHaveClass(
            "h-6",
            "text-sm",
          );
          expect(inputElement).toHaveClass(
            "py-1",
            "px-1.5",
          );
          break;
        case "medium":
          expect(inputElement.parentElement).toHaveClass(
            "h-8",
            "text-sm",
          );
          expect(inputElement).toHaveClass(
            "py-1",
            "px-1.5",
          );
          break;
        case "large":
          expect(inputElement.parentElement).toHaveClass(
            "h-10",
            "text-md",
          );
          expect(inputElement).toHaveClass(
            "py-1.5",
            "px-2",
          );
          break;
      }
    });
  });

  /** prefix prop */
  it("should set prefix of the input", () => {
    const mockProps = {
      prefix: "+91",
    };
    renderInputComponent(mockProps);
    const prefixElement = screen.getByText(mockProps.prefix);
    expect(prefixElement).toBeVisible();
  });

  /** suffix prop */
  it("should set suffix of the input", () => {
    const mockProps = {
      suffix: "@example.com",
    };
    renderInputComponent(mockProps);
    const suffixElement = screen.getByText(mockProps.suffix);
    expect(suffixElement).toBeVisible();
  });

  /** type prop */
  it("should set type of the input", () => {
    const mockProps = {
      type: "date" as const,
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement).toHaveAttribute("type", mockProps.type);
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      base: { "data-testId": "test-base-slot-id", class: "test-class-base", },
      prefix: { "data-testId": "test-prefix-slot-id", class: "test-class-prefix", },
      suffix: { "data-testId": "test-suffix-slot-id", class: "test-class-suffix", },
    };
    const mockProps = {
      prefix: "https://",
      suffix: ".com",
      slotProps,
    };
    renderInputComponent(mockProps);
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    const baseSlot = screen.getByTestId(slotProps.base["data-testId"]);
    expect(inputElement.parentElement).toBe(baseSlot);
    expect(baseSlot).toBeVisible();
    expect(baseSlot).toHaveClass(slotProps.base.class);
    const prefixSlot = screen.getByTestId(slotProps.prefix["data-testId"]);
    expect(inputElement.previousElementSibling).toBe(prefixSlot);
    expect(prefixSlot).toBeVisible();
    expect(prefixSlot).toHaveClass(slotProps.prefix.class);
    const suffixSlot = screen.getByTestId(slotProps.suffix["data-testId"]);
    expect(inputElement.nextElementSibling).toBe(suffixSlot);
    expect(suffixSlot).toBeVisible();
    expect(suffixSlot).toHaveClass(slotProps.suffix.class);
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
          <Input 
            id="username"
          />
        </div>
      </ThemeProvider>
    ));
    const inputElement = screen.getByLabelText("Username");
    expect(inputElement).toBeVisible();
    expect(inputElement.parentElement).toHaveClass(customClass);
  });
});