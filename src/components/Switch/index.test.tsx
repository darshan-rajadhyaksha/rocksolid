import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Switch, { type SwitchProps } from "@/components/Switch";
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

const renderSwitchComponent = (
  props?: SwitchProps,
) => {
  return render(() => (
    <Switch 
      {...props}
    />
  ));
};

describe("Switch component", () => {
  it("should render the switch", () => {
    renderSwitchComponent();
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).toHaveClass(
      "absolute",
      "inset-0",
      "w-full",
      "h-full",
      "opacity-0",
      "outline-none",
    );
    const switchBaseElement = switchElement.parentElement;
    expect(switchBaseElement).toBeVisible();
    expect(switchBaseElement?.tagName?.toLowerCase()).toBe("span");
    expect(switchBaseElement).toHaveClass(
      "relative",
      theme.rounded.full,
      theme.focusWithin,
    );
    const switchHandleElement = switchElement.previousElementSibling;
    expect(switchHandleElement).toBeVisible();
    expect(switchHandleElement?.tagName?.toLowerCase()).toBe("span");
    expect(switchHandleElement).toHaveClass(
      "absolute",
      "translate-y-[2px]",
      "ltr:translate-x-[2px]",
      "rtl:-translate-x-[2px]",
      "bg-white",
      "shadow-sm",
      theme.rounded.full,
    );
  });

  /** class prop */
  it("should apply custom class to switch element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderSwitchComponent(mockProps);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).toHaveClass(mockProps.class);
  });

  /** checked prop */
  it("should display switch with checked state", () => {
    const mockProps = {
      checked: true,
    };
    renderSwitchComponent(mockProps);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).toBeChecked();
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render unchecked switch with color=${color} and disabled=false`, () => {
      renderSwitchComponent({
        color,
        checked: false,
        disabled: false,
      });
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeVisible();
      const switchBaseElement = switchElement.parentElement;
      expect(switchBaseElement).toBeVisible();
      /** Asset classes */
      expect(switchBaseElement).toHaveClass(
        "bg-neutral-300",
        "dark:bg-neutral-700",
      );
    });

    it(`should render checked switch with color=${color} and disabled=false`, () => {
      renderSwitchComponent({
        color,
        checked: true,
        disabled: false,
      });
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeVisible();
      const switchBaseElement = switchElement.parentElement;
      expect(switchBaseElement).toBeVisible();
      expect(switchBaseElement).toHaveClass(
        theme.colors[color].solid.background,
      );
      const switchHandleElement = switchElement.previousElementSibling;
      expect(switchHandleElement).toBeVisible();
      expect(switchHandleElement).toHaveClass(
        color === "default" ? "dark:bg-neutral-900" : "bg-white",
      );
    });

    it(`should render switch with color=${color} and disabled=true`, () => {
      renderSwitchComponent({
        color,
        disabled: true,
      });
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeVisible();
      const switchBaseElement = switchElement.parentElement;
      expect(switchBaseElement).toBeVisible();
      // /** Asset classes */
      expect(switchBaseElement).toHaveClass(
        "opacity-50",
      );
    });
  });

  /** disabled prop */
  it("should disable the switch", () => {
    const mockProps = {
      disabled: true,
    };
    renderSwitchComponent(mockProps);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).toBeDisabled();
  });

  /** defaultChecked prop */
  it("should display switch with checked state when defaultChecked is set", () => {
    const mockProps = {
      defaultChecked: true,
    };
    renderSwitchComponent(mockProps);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).toBeChecked();
  });

  /** id prop */
  it("should set id to switch element", () => {
    const mockProps = {
      id: "test-id",
    };
    renderSwitchComponent(mockProps);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).toHaveAttribute("id", mockProps.id);
  });

  /** onChange prop */
  it("should call onChange callback when checked state is changed", async () => {
    const mockProps = {
      onChange: vi.fn(),
    };
    renderSwitchComponent(mockProps);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    expect(switchElement).not.toBeChecked();
    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      }),
      true,
    );
    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
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
    it(`should render unchecked switch with size=${size}`, () => {
      const mockProps = {
        checked: false,
        size,
      };
      renderSwitchComponent(mockProps);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeVisible();
      const switchBaseElement = switchElement.parentElement;
      expect(switchBaseElement).toBeVisible();
      const switchHandleElement = switchElement.previousElementSibling;
      expect(switchHandleElement).toBeVisible();
      switch(size) {
        case "small":
          expect(switchBaseElement).toHaveClass(
            "w-8",
            "h-5",
          );
          expect(switchHandleElement).toHaveClass(
            "size-4",
          );
          break;
        case "medium":
          expect(switchBaseElement).toHaveClass(
            "w-10",
            "h-6",
          );
          expect(switchHandleElement).toHaveClass(
            "size-5",
          );
          break;
        case "large":
          expect(switchBaseElement).toHaveClass(
            "w-12",
            "h-7",
          );
          expect(switchHandleElement).toHaveClass(
            "size-6",
          );
          break;
      }
    });

    it(`should render checked switch with size=${size}`, () => {
      const mockProps = {
        checked: true,
        size,
      };
      renderSwitchComponent(mockProps);
      const switchElement = screen.getByRole("switch");
      expect(switchElement).toBeVisible();
      const switchBaseElement = switchElement.parentElement;
      expect(switchBaseElement).toBeVisible();
      const switchHandleElement = switchElement.previousElementSibling;
      expect(switchHandleElement).toBeVisible();
      switch(size) {
        case "small":
          expect(switchBaseElement).toHaveClass(
            "w-8",
            "h-5",
          );
          expect(switchHandleElement).toHaveClass(
            "size-4",
            "ltr:translate-x-[14px]",
            "rtl:-translate-x-[14px]",
          );
          break;
        case "medium":
          expect(switchBaseElement).toHaveClass(
            "w-10",
            "h-6",
          );
          expect(switchHandleElement).toHaveClass(
            "size-5",
            "ltr:translate-x-[18px]",
            "rtl:-translate-x-[18px]",
          );
          break;
        case "large":
          expect(switchBaseElement).toHaveClass(
            "w-12",
            "h-7",
          );
          expect(switchHandleElement).toHaveClass(
            "size-6",
            "ltr:translate-x-[22px]",
            "rtl:-translate-x-[22px]",
          );
          break;
      }
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      base: { "data-testId": "test-base-id", class: "test-class-base", },
      handle: { "data-testId": "test-handle-id", class: "test-class-handle", },
    };
    renderSwitchComponent({ slotProps });
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    const baseSlotElement = screen.getByTestId(slotProps.base["data-testId"]);
    expect(baseSlotElement).toBeVisible();
    expect(switchElement.parentElement).toBe(baseSlotElement);
    expect(baseSlotElement).toHaveClass(slotProps.base.class);
    const handleSlotElement = screen.getByTestId(slotProps.handle["data-testId"]);
    expect(handleSlotElement).toBeVisible();
    expect(switchElement.previousElementSibling).toBe(handleSlotElement);
    expect(handleSlotElement).toHaveClass(slotProps.handle.class);
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
        <Switch
          defaultChecked
        />
      </ThemeProvider>
    ));
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeVisible();
    const switchBaseElement = switchElement.parentElement;
    expect(switchBaseElement).toBeVisible();
    expect(switchBaseElement).toHaveClass(customClass);
  });
});