import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Checkbox, { type CheckboxProps } from "@/components/Checkbox";
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

const renderCheckboxComponent = (
  props?: CheckboxProps,
) => {
  return render(() => (
    <Checkbox 
      {...props}
    />
  ));
};

describe("Checkbox component", () => {
  it("should render the checkbox", () => {
    renderCheckboxComponent();
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).toHaveClass(
      "absolute",
      "inset-0",
      "w-full",
      "h-full",
      "opacity-0",
      "outline-none",
    );
    const checkboxBaseElement = checkboxElement.parentElement;
    expect(checkboxBaseElement).toBeVisible();
    expect(checkboxBaseElement?.tagName?.toLowerCase()).toBe("span");
    expect(checkboxBaseElement).toHaveClass(
      "relative",
      theme.focusWithin,
    );
  });

  /** class prop */
  it("should apply custom class to checkbox element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderCheckboxComponent(mockProps);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).toHaveClass(mockProps.class);
  });

  /** checked prop */
  it("should display checkbox with checked state", () => {
    const mockProps = {
      checked: true,
    };
    renderCheckboxComponent(mockProps);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).toBeChecked();
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render unchecked checkbox with color=${color} and disabled=false`, () => {
      renderCheckboxComponent({
        color,
        checked: false,
        disabled: false,
      });
      const checkboxElement = screen.getByRole("checkbox");
      expect(checkboxElement).toBeVisible();
      const checkboxBaseElement = checkboxElement.parentElement;
      expect(checkboxBaseElement).toBeVisible();
      /** Asset classes */
      expect(checkboxBaseElement).toHaveClass(
        theme.typography.colors.textTertiary,
      );
    });

    it(`should render checked checkbox with color=${color} and disabled=false`, () => {
      renderCheckboxComponent({
        color,
        checked: true,
        disabled: false,
      });
      const checkboxElement = screen.getByRole("checkbox");
      expect(checkboxElement).toBeVisible();
      const checkboxBaseElement = checkboxElement.parentElement;
      expect(checkboxBaseElement).toBeVisible();
      /** Asset classes */
      expect(checkboxBaseElement).toHaveClass(
        theme.colors[color]["ghost"].background,
        theme.colors[color]["ghost"].border,
        theme.colors[color]["ghost"].hover,
        theme.colors[color]["ghost"].active,
        theme.colors[color]["ghost"].text,
      );
    });

    it(`should render checkbox with color=${color} and disabled=true`, () => {
      renderCheckboxComponent({
        color,
        disabled: true,
      });
      const checkboxElement = screen.getByRole("checkbox");
      expect(checkboxElement).toBeVisible();
      const checkboxBaseElement = checkboxElement.parentElement;
      expect(checkboxBaseElement).toBeVisible();
      // /** Asset classes */
      expect(checkboxBaseElement).toHaveClass(
        theme.disabled.text,
      );
    });
  });

  /** disabled prop */
  it("should disable the checkbox", () => {
    const mockProps = {
      disabled: true,
    };
    renderCheckboxComponent(mockProps);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).toBeDisabled();
  });

  /** defaultChecked prop */
  it("should display checkbox with checked state when defaultChecked is set", () => {
    const mockProps = {
      defaultChecked: true,
    };
    renderCheckboxComponent(mockProps);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).toBeChecked();
  });

  /** id prop */
  it("should set id to checkbox element", () => {
    const mockProps = {
      id: "test-id",
    };
    renderCheckboxComponent(mockProps);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).toHaveAttribute("id", mockProps.id);
  });

  /** onChange prop */
  it("should call onChange callback when checked state is changed", async () => {
    const mockProps = {
      onChange: vi.fn(),
    };
    renderCheckboxComponent(mockProps);
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    expect(checkboxElement).not.toBeChecked();
    await userEvent.click(checkboxElement);
    expect(checkboxElement).toBeChecked();
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      }),
      true,
    );
    await userEvent.click(checkboxElement);
    expect(checkboxElement).not.toBeChecked();
    expect(mockProps.onChange).toHaveBeenCalledTimes(2);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: false,
        }),
      }),
      false,
    );
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render checkbox with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderCheckboxComponent(mockProps);
      const checkboxElement = screen.getByRole("checkbox");
      expect(checkboxElement).toBeVisible();
      const checkboxBaseElement = checkboxElement.parentElement;
      expect(checkboxBaseElement).toBeVisible();
      switch(size) {
        case "small":
          expect(checkboxBaseElement).toHaveClass(
            "size-6",
            "text-lg",
          );
          break;
        case "medium":
          expect(checkboxBaseElement).toHaveClass(
            "size-8",
            "text-2xl",
          );
          break;
        case "large":
          expect(checkboxBaseElement).toHaveClass(
            "size-10",
            "text-3xl",
          );
          break;
      }
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      base: { "data-testId": "test-base-id", class: "test-class-base", },
    };
    renderCheckboxComponent({ slotProps });
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    const baseSlotElement = screen.getByTestId(slotProps.base["data-testId"]);
    expect(baseSlotElement).toBeVisible();
    expect(baseSlotElement).toHaveClass(slotProps.base.class);
    expect(checkboxElement.parentElement).toBe(baseSlotElement);
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
        <Checkbox
          defaultChecked
        />
      </ThemeProvider>
    ));
    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeVisible();
    const checkboxBaseElement = checkboxElement.parentElement;
    expect(checkboxBaseElement).toBeVisible();
    expect(checkboxBaseElement).toHaveClass(customClass);
  });
});