import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Radio, { type RadioProps } from "@/components/Radio";
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

const renderRadioComponent = (
  props?: RadioProps,
) => {
  return render(() => (
    <Radio 
      {...props}
    />
  ));
};

describe("Radio component", () => {
  it("should render the radio", () => {
    renderRadioComponent();
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toHaveClass(
      "absolute",
      "inset-0",
      "w-full",
      "h-full",
      "opacity-0",
      "outline-none",
    );
    const radioBaseElement = radioElement.parentElement;
    expect(radioBaseElement).toBeVisible();
    expect(radioBaseElement?.tagName?.toLowerCase()).toBe("span");
    expect(radioBaseElement).toHaveClass(
      "relative",
      theme.focusWithin,
    );
  });

  /** class prop */
  it("should apply custom class to radio element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toHaveClass(mockProps.class);
  });

  /** checked prop */
  it("should display radio with checked state", () => {
    const mockProps = {
      checked: true,
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toBeChecked();
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render unchecked radio with color=${color} and disabled=false`, () => {
      renderRadioComponent({
        color,
        checked: false,
        disabled: false,
      });
      const radioElement = screen.getByRole("radio");
      expect(radioElement).toBeVisible();
      const radioBaseElement = radioElement.parentElement;
      expect(radioBaseElement).toBeVisible();
      /** Asset classes */
      expect(radioBaseElement).toHaveClass(
        theme.typography.colors.textTertiary,
      );
    });

    it(`should render checked radio with color=${color} and disabled=false`, () => {
      renderRadioComponent({
        color,
        checked: true,
        disabled: false,
      });
      const radioElement = screen.getByRole("radio");
      expect(radioElement).toBeVisible();
      const radioBaseElement = radioElement.parentElement;
      expect(radioBaseElement).toBeVisible();
      /** Asset classes */
      expect(radioBaseElement).toHaveClass(
        theme.colors[color]["ghost"].background,
        theme.colors[color]["ghost"].border,
        theme.colors[color]["ghost"].hover,
        theme.colors[color]["ghost"].active,
        theme.colors[color]["ghost"].text,
      );
    });

    it(`should render radio with color=${color} and disabled=true`, () => {
      renderRadioComponent({
        color,
        disabled: true,
      });
      const radioElement = screen.getByRole("radio");
      expect(radioElement).toBeVisible();
      const radioBaseElement = radioElement.parentElement;
      expect(radioBaseElement).toBeVisible();
      // /** Asset classes */
      expect(radioBaseElement).toHaveClass(
        theme.disabled.text,
      );
    });
  });

  /** disabled prop */
  it("should disable the radio", () => {
    const mockProps = {
      disabled: true,
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toBeDisabled();
  });

  /** defaultChecked prop */
  it("should display radio with checked state when defaultChecked is set", () => {
    const mockProps = {
      defaultChecked: true,
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toBeChecked();
  });

  /** id prop */
  it("should set id to radio element", () => {
    const mockProps = {
      id: "test-id",
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toHaveAttribute("id", mockProps.id);
  });

  /** name prop */
  it("should set name to radio element", () => {
    const mockProps = {
      name: "test-name",
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).toHaveAttribute("name", mockProps.name);
  });

  /** onChange prop */
  it("should call onChange callback when checked state is changed", async () => {
    const mockProps = {
      onChange: vi.fn(),
    };
    renderRadioComponent(mockProps);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    expect(radioElement).not.toBeChecked();
    await userEvent.click(radioElement);
    expect(radioElement).toBeChecked();
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          checked: true,
        }),
      }),
    );
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render radio with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderRadioComponent(mockProps);
      const radioElement = screen.getByRole("radio");
      expect(radioElement).toBeVisible();
      const radioBaseElement = radioElement.parentElement;
      expect(radioBaseElement).toBeVisible();
      switch(size) {
        case "small":
          expect(radioBaseElement).toHaveClass(
            "size-6",
            "text-lg",
          );
          break;
        case "medium":
          expect(radioBaseElement).toHaveClass(
            "size-8",
            "text-2xl",
          );
          break;
        case "large":
          expect(radioBaseElement).toHaveClass(
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
    renderRadioComponent({ slotProps });
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    const baseSlotElement = screen.getByTestId(slotProps.base["data-testId"]);
    expect(baseSlotElement).toBeVisible();
    expect(radioElement.parentElement).toBe(baseSlotElement);
    expect(baseSlotElement).toHaveClass(slotProps.base.class);
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
        <Radio
          defaultChecked
        />
      </ThemeProvider>
    ));
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeVisible();
    const radioBaseElement = radioElement.parentElement;
    expect(radioBaseElement).toBeVisible();
    expect(radioBaseElement).toHaveClass(customClass);
  });
});