import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Button, { type ButtonProps } from "@/components/Button";
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

const variants = [
  "solid",
  "filled",
  "outlined",
  "ghost",
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const renderButtonComponent = (
  props?: ButtonProps<"button">,
) => {
  return render(() => (
    <Button {...props}>
      Download
    </Button>
  ));
};

describe("Button component", () => {
  it("should render the button", () => {
    renderButtonComponent();
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass(
      "inline-flex",
      "justify-center",
      "items-center",
      "gap-2",
      "font-normal",
      "align-middle",
      theme.rounded.small,
      theme.focus,
    );
  });

  /** class prop */
  it("should apply custom class to button element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass(mockProps.class);
  });

  /** color & variant prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render button with color=${color}, variant=${variant} and disabled=false`, () => {
        renderButtonComponent({
          color,
          variant,
          disabled: false,
        });
        const buttonElement = screen.getByRole("button", { name: "Download" });
        expect(buttonElement).toBeVisible();
        /** Asset classes */
        expect(buttonElement).toHaveClass(
          theme.colors[color][variant].background,
          theme.colors[color][variant].border,
          theme.colors[color][variant].hover,
          theme.colors[color][variant].active,
          theme.colors[color][variant].text,
        );
      });
      it(`should render button with color=${color}, variant=${variant} and disabled=true`, () => {
        renderButtonComponent({
          color,
          variant,
          disabled: true,
        });
        const buttonElement = screen.getByRole("button", { name: "Download" });
        expect(buttonElement).toBeVisible();
        // /** Asset classes */
        expect(buttonElement).toHaveClass(
          theme.disabled.text,
        );
        if (["solid", "filled"].includes(variant)) {
          expect(buttonElement).toHaveClass(
            theme.disabled.background,
          );
        }
        if (variant === "outlined") {
          expect(buttonElement).toHaveClass(
            "border",
            theme.disabled.border,
          );
        }
      });
    });
  });

  /** disabled prop */
  it("should disable the button", () => {
    const mockProps = {
      disabled: true,
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toBeDisabled();
  });

  /** endIcon prop */
  it("should add icon at the end of button", () => {
    const mockProps = {
      class: "test-class",
      endIcon: <span data-testId="button-end-icon" />,
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    const endIconElement = within(
      buttonElement
    ).getByTestId("button-end-icon");
    expect(endIconElement).toBeVisible();
    /** slot of endIcon */ 
    expect(endIconElement.parentElement).toHaveClass(
      "leading-[1]",
      "shrink-0",
    );
  });

  /** fullWidth prop */
  it("should not apply full width to button", () => {
    const mockProps = {
      fullWidth: false,
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    expect(buttonElement).not.toHaveClass("w-full");
  });

  it("should apply full width to button", () => {
    const mockProps = {
      fullWidth: true,
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass("w-full");
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render button with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderButtonComponent(mockProps);
      const buttonElement = screen.getByRole("button", { name: "Download" });
      expect(buttonElement).toBeVisible();
      switch(size) {
        case "small":
          expect(buttonElement).toHaveClass(
            "py-[2px]",
            "px-2",
            "text-sm",
            "gap-2",
            "min-h-6",
          );
          break;
        case "medium":
          expect(buttonElement).toHaveClass(
            "py-1",
            "px-3",
            "text-sm",
            "gap-2",
            "min-h-8",
          );
          break;
        case "large":
          expect(buttonElement).toHaveClass(
            "py-2",
            "px-5",
            "text-md",
            "gap-3",
            "min-h-10",
          );
          break;
      }
    });
  });

  /** startIcon prop */
  it("should add icon at the start of button", () => {
    const mockProps = {
      class: "test-class",
      startIcon: <span data-testId="button-start-icon" />,
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", { name: "Download" });
    expect(buttonElement).toBeVisible();
    const startIconElement = within(
      buttonElement
    ).getByTestId("button-start-icon");
    expect(startIconElement).toBeVisible();
    /** slot of startIcon */ 
    expect(startIconElement.parentElement).toHaveClass(
      "leading-[1]",
      "shrink-0",
    );
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const mockProps = {
      startIcon: <span aria-hidden={true}>+</span>,
      endIcon: <span aria-hidden={true}>-</span>,
      slotProps: {
        startIcon: { "data-testId": "start-icon-slot-id", class: "test-class-start-icon", },
        endIcon: { "data-testId": "end-icon-slot-id", class: "test-class-end-icon", },
      },
    };
    renderButtonComponent(mockProps);
    const buttonElement = screen.getByRole("button", {
      name: "Download",
    });
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toBeVisible();
    const startIconSlotElement = within(
      buttonElement
    ).getByTestId(mockProps.slotProps.startIcon["data-testId"]);
    expect(startIconSlotElement).toBeVisible();
    expect(startIconSlotElement).toHaveClass(mockProps.slotProps.startIcon.class);
    const endIconSlotElement = within(
      buttonElement
    ).getByTestId(mockProps.slotProps.endIcon["data-testId"]);
    expect(endIconSlotElement).toBeVisible();
    expect(endIconSlotElement).toHaveClass(mockProps.slotProps.endIcon.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          solid: {
            background: customClass,
          }
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Button>
          Download
        </Button>
      </ThemeProvider>
    ));
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeVisible();
    expect(buttonElement).toHaveClass(customClass);
  });
});