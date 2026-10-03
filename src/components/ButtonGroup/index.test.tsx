import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Button from "@/components/Button";
import ButtonGroup, { type ButtonGroupProps } from "@/components/ButtonGroup";
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

const orientations = [
  "horizontal",
  "vertical",
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const renderButtonGroupComponent = (
  props?: ButtonGroupProps,
) => {
  return render(() => (
    <ButtonGroup
      {...props}
    >
      <Button>
        First
      </Button>
      <Button>
        Second
      </Button>
      <Button>
        Third
      </Button>
    </ButtonGroup>
  ));
};

describe("ButtonGroup component", () => {
  it("should render the button group", () => {
    const mockProps = {
      "aria-label": "Test Button Group",
    }
    renderButtonGroupComponent(mockProps);
    const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
    expect(buttonGroupElement).toBeVisible();
    expect(buttonGroupElement).toHaveClass(
      "inline-flex",
      "flex-row",
      "gap-0",
      "ltr:[&>button:first-child]:rounded-tl-sm",
      "ltr:[&>button:first-child]:rounded-bl-sm",
      "ltr:[&>button:last-child]:rounded-tr-sm",
      "ltr:[&>button:last-child]:rounded-br-sm",
      "rtl:[&>button:first-child]:rounded-tr-sm",
      "rtl:[&>button:first-child]:rounded-br-sm",
      "rtl:[&>button:last-child]:rounded-tl-sm",
      "rtl:[&>button:last-child]:rounded-bl-sm",
      "ltr:[&>button]:border-l-1",
      "rtl:[&>button]:border-r-1", 
      "ltr:[&>button:first-child]:border-l-0",
      "rtl:[&>button:first-child]:border-r-0",
      "ltr:[&>button:last-child]:border-r-0",
      "rtl:[&>button:last-child]:border-l-0",
      "ltr:[&>button]:border-l-white/40",
      "rtl:[&>button]:border-r-white/40",
      "ltr:dark:[&>button]:border-l-black/40",
      "rtl:dark:[&>button]:border-r-black/40",
    );
    const buttonElements = within(buttonGroupElement).getAllByRole("button");
    expect(buttonElements).toHaveLength(3);
    buttonElements.forEach((buttonElement) => {
      expect(buttonElement).toHaveClass(
        "inline-flex",
        "justify-center",
        "items-center",
        "gap-2",
        "font-normal",
        "align-middle",
        theme.rounded.none,
        theme.focus,
      );
    });
  });

  /** class prop */
  it("should apply custom class to button group element", () => {
    const mockProps = {
      "aria-label": "Test Button Group",
      class: "test-class",
    };
    renderButtonGroupComponent(mockProps);
    const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
    expect(buttonGroupElement).toBeVisible();
    expect(buttonGroupElement).toHaveClass(mockProps.class);
  });

  /** color & variant prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render button group with color=${color}, variant=${variant} and disabled=false`, () => {
        const mockProps = {
          "aria-label": "Test Button Group",
          color,
          variant,
          disabled: false,
        };
        renderButtonGroupComponent(mockProps);
        const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
        expect(buttonGroupElement).toBeVisible();
        switch(variant) {
          case "solid": 
            expect(buttonGroupElement).toHaveClass(
              "ltr:[&>button]:border-l-1",
              "rtl:[&>button]:border-r-1", 
              "ltr:[&>button:first-child]:border-l-0",
              "rtl:[&>button:first-child]:border-r-0",
              "ltr:[&>button:last-child]:border-r-0",
              "rtl:[&>button:last-child]:border-l-0",
              "ltr:[&>button]:border-l-white/40",
              "rtl:[&>button]:border-r-white/40",
              "ltr:dark:[&>button]:border-l-black/40",
              "rtl:dark:[&>button]:border-r-black/40",
            );
            break;
          case "outlined":
            expect(buttonGroupElement).toHaveClass(
              "ltr:[&>button:not(:last-child)]:border-r-0",
              "rtl:[&>button:not(:last-child)]:border-l-0",
            );
            break;
          case "filled":
          case "ghost":
            expect(buttonGroupElement).toHaveClass(
              "ltr:[&>button]:border-l-1",
              "rtl:[&>button]:border-r-1", 
              "ltr:[&>button:first-child]:border-l-0",
              "rtl:[&>button:first-child]:border-r-0",
              "ltr:[&>button:last-child]:border-r-0",
              "rtl:[&>button:last-child]:border-l-0",
              "ltr:[&>button]:border-l-[rgba(127,127,127,0.40)]",
              "rtl:[&>button]:border-r-[rgba(127,127,127,0.40)]",
            );
            break;
        }
        const buttonElements = within(buttonGroupElement).getAllByRole("button");
        expect(buttonElements).toHaveLength(3);
        buttonElements.forEach((buttonElement) => {     
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
      });
      it(`should render button group with color=${color}, variant=${variant} and disabled=true`, () => {
        const mockProps = {
          "aria-label": "Test Button Group",
          color,
          variant,
          disabled: true,
        };
        renderButtonGroupComponent(mockProps);
        const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
        expect(buttonGroupElement).toBeVisible();
        switch(variant) {
          case "solid":
          case "filled":
          case "ghost":
            expect(buttonGroupElement).toHaveClass(
              "ltr:[&>button]:border-l-1",
              "rtl:[&>button]:border-r-1", 
              "ltr:[&>button:first-child]:border-l-0",
              "rtl:[&>button:first-child]:border-r-0",
              "ltr:[&>button:last-child]:border-r-0",
              "rtl:[&>button:last-child]:border-l-0",
              "ltr:[&>button]:border-l-neutral-300",
              "rtl:[&>button]:border-r-neutral-300",
              "ltr:dark:[&>button]:border-l-neutral-700",
              "rtl:dark:[&>button]:border-r-neutral-700",
            );
            break;
        }
        const buttonElements = within(buttonGroupElement).getAllByRole("button");
        expect(buttonElements).toHaveLength(3);
        buttonElements.forEach((buttonElement) => {     
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
  });

  /** disabled prop */
  it("should disable the button group", () => {
    const mockProps = {
      "aria-label": "Test Button Group",
      disabled: true,
    };
    renderButtonGroupComponent(mockProps);
    const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
    expect(buttonGroupElement).toBeVisible();
    const buttonElements = within(buttonGroupElement).getAllByRole("button");
    expect(buttonElements).toHaveLength(3);
    buttonElements.forEach((buttonElement) => {
      expect(buttonElement).toBeDisabled();
    });
  });

  /** fullWidth prop */
  it("should apply full width to button group", () => {
    const mockProps = {
      "aria-label": "Test Button Group",
      fullWidth: true,
    };
    renderButtonGroupComponent(mockProps);
    const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
    expect(buttonGroupElement).toBeVisible();
    expect(buttonGroupElement).toHaveClass("w-full");
    const buttonElements = within(buttonGroupElement).getAllByRole("button");
    expect(buttonElements).toHaveLength(3);
    buttonElements.forEach((buttonElement) => {
      expect(buttonElement).toHaveClass("w-full");
    });
  });

  /** orientation prop */
  orientations.map((orientation) => {
    it(`should render button group with orientation=${orientation}`, () => {
      const mockProps = {
        "aria-label": "Test Button Group",
        orientation,
      };
      renderButtonGroupComponent(mockProps);
      const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
      expect(buttonGroupElement).toBeVisible();
      switch(orientation) {
        case "horizontal":
          expect(buttonGroupElement).toHaveClass(
            "flex-row",
            "ltr:[&>button:first-child]:rounded-tl-sm",
            "ltr:[&>button:first-child]:rounded-bl-sm",
            "ltr:[&>button:last-child]:rounded-tr-sm",
            "ltr:[&>button:last-child]:rounded-br-sm",
            "rtl:[&>button:first-child]:rounded-tr-sm",
            "rtl:[&>button:first-child]:rounded-br-sm",
            "rtl:[&>button:last-child]:rounded-tl-sm",
            "rtl:[&>button:last-child]:rounded-bl-sm",
            "ltr:[&>button]:border-l-1",
            "rtl:[&>button]:border-r-1", 
            "ltr:[&>button:first-child]:border-l-0",
            "rtl:[&>button:first-child]:border-r-0",
            "ltr:[&>button:last-child]:border-r-0",
            "rtl:[&>button:last-child]:border-l-0"
          );
          break;
        case "vertical":
          expect(buttonGroupElement).toHaveClass(
            "flex-col",
            "[&>button:first-child]:rounded-tl-sm",
            "[&>button:first-child]:rounded-tr-sm",
            "[&>button:last-child]:rounded-bl-sm",
            "[&>button:last-child]:rounded-br-sm",
            "[&>button]:border-b-1",
            "[&>button:last-child]:border-b-0",
          );
      }
    });
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render button group with size=${size}`, () => {
      const mockProps = {
        "aria-label": "Test Button Group",
        size,
      };
      renderButtonGroupComponent(mockProps);
      const buttonGroupElement = screen.getByRole("group", { name: mockProps["aria-label"] });
      expect(buttonGroupElement).toBeVisible();
      const buttonElements = within(buttonGroupElement).getAllByRole("button");
      expect(buttonElements).toHaveLength(3);
      buttonElements.forEach((buttonElement) => {
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
  });
});