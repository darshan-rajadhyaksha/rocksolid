import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect, vi } from "vitest";
import Chip, { type ChipProps } from "@/components/Chip";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import Avatar from "../Avatar";
import userEvent from "@testing-library/user-event";

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
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const renderChipComponent = (
  props: ChipProps,
) => {
  return render(() => (
    <Chip {...props} />
  ));
};

describe("Chip component", () => {
  it("should render the chip", () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
      onDelete: vi.fn(),
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    expect(chipElement).toHaveTextContent(mockProps.label);
    expect(chipElement.tagName.toLowerCase()).toBe("div");
    expect(chipElement).toHaveClass(
      "inline-flex",
      "items-center",
      "max-w-full",
      "font-normal",
      "align-middle",
      theme.rounded.full,
    );
    const chipLabelElement = chipElement.childNodes[0];
    expect(chipLabelElement).toBeVisible();
    expect(chipLabelElement).toHaveTextContent(mockProps.label);
    const chipDeleteIconElement = chipElement.childNodes[1];
    expect(chipDeleteIconElement).toBeVisible();
    expect(chipDeleteIconElement).toHaveClass("shrink-0");
  });

  /** avatar prop */
  it("should display avatar in chip element", () => {
    const avatarTestId = "avatar-test-id";
    const mockProps = {
      "data-testId": "chip-test-id",
      avatar: <Avatar data-testId={avatarTestId}>JD</Avatar>,
      label: "Test label",
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    const avatarElement = within(chipElement).getByTestId(avatarTestId);
    expect(avatarElement).toBeVisible();
  });

  /** class prop */
  it("should apply custom class to chip element", () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
      class: "test-class",
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    expect(chipElement).toHaveClass(mockProps.class);
  });

  /** color & variant prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render chip with color=${color}, variant=${variant} and disabled=false`, () => {
        const mockProps = {
          "data-testId": "chip-test-id",
          label: "Test label",
          color,
          variant,
          disabled: false,
        };
        renderChipComponent(mockProps);
        const chipElement = screen.getByTestId(mockProps["data-testId"]);
        expect(chipElement).toBeVisible();
        /** Asset classes */
        expect(chipElement).toHaveClass(
          theme.colors[color][variant].background,
          theme.colors[color][variant].border,
          theme.colors[color][variant].text,
        );
      });

      it(`should render chip with color=${color}, variant=${variant} and disabled=true`, () => {
        const mockProps = {
          "data-testId": "chip-test-id",
          label: "Test label",
          color,
          variant,
          disabled: true,
        };
        renderChipComponent(mockProps);
        const chipElement = screen.getByTestId(mockProps["data-testId"]);
        expect(chipElement).toBeVisible();
        // /** Asset classes */
        expect(chipElement).toHaveClass(
          theme.disabled.text,
        );
        if (["solid", "filled"].includes(variant)) {
          expect(chipElement).toHaveClass(
            theme.disabled.background,
          );
        }
        if (variant === "outlined") {
          expect(chipElement).toHaveClass(
            "border",
            theme.disabled.border,
          );
        }
      });
    });
  });

  /** disabled prop */
  it("should disable the chip", () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
      disabled: true,
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    expect(chipElement).toHaveAttribute("aria-disabled", "true");
  });

  /** deleteIcon prop */
  it("should set custom delete icon to chip", () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
      deleteIcon: <span data-testId="chip-delete-icon" />,
      onDelete: vi.fn(),
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    const deleteIconElement = within(
      chipElement
    ).getByTestId("chip-delete-icon");
    expect(deleteIconElement).toBeVisible();
    /** slot of deleteIcon */ 
    expect(deleteIconElement.parentElement).toHaveClass("shrink-0");
  });

  /** icon prop */
  it("should display icon in chip element", () => {
    const iconTestId = "avatar-test-id";
    const mockProps = {
      "data-testId": "chip-test-id",
      avatar: <span data-testId={iconTestId} />,
      label: "Test label",
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    const iconElement = within(chipElement).getByTestId(iconTestId);
    expect(iconElement).toBeVisible();
  });

  /** onClick prop */
  it("should display clickable chip", async () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
      onClick: vi.fn(),
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    expect(chipElement).toHaveTextContent(mockProps.label);
    expect(chipElement.tagName.toLowerCase()).toBe("button");
    expect(chipElement).toHaveClass(
      "cursor-pointer",
      theme.focus,
    );
    await userEvent.click(chipElement);
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("should not make clickable chip if disabled is true", async () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      disabled: true,
      label: "Test label",
      onClick: vi.fn(),
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    expect(chipElement).toHaveTextContent(mockProps.label);
    expect(chipElement.tagName.toLowerCase()).toBe("button");
    expect(chipElement).toHaveClass("pointer-events-none");
    expect(chipElement).not.toHaveAttribute("tabindex", "0");
    await userEvent.click(chipElement);
    expect(mockProps.onClick).toHaveBeenCalledTimes(0);
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render chip with size=${size}`, () => {
      const mockProps = {
        "data-testId": "chip-test-id",
        label: "Test label",
        size,
      };
      renderChipComponent(mockProps);
      const chipElement = screen.getByTestId(mockProps["data-testId"]);
      expect(chipElement).toBeVisible();
      const chipDeleteIconElement = chipElement.childNodes[1];
      expect(chipDeleteIconElement).toBeVisible();
      switch(size) {
        case "small":
          expect(chipElement).toHaveClass(
            "h-6",
            "px-1.5",
            "py-[2px]",
            "gap-[2px]",
            "text-xs",
          );
          expect(chipDeleteIconElement).toHaveClass("text-md");
          break;
        case "medium":
          expect(chipElement).toHaveClass(
            "h-7",
            "px-2.5",
            "py-1",
            "gap-[3px]",
            "text-sm",
          );
          expect(chipDeleteIconElement).toHaveClass("text-lg");
          break;
        case "large":
          expect(chipElement).toHaveClass(
            "h-8",
            "px-3",
            "py-1.5",
            "gap-1",
            "text-md",
          );
          expect(chipDeleteIconElement).toHaveClass("text-xl");
          break;
      }
    });

    it(`should have styles for delete-icon for size=${size}`, () => {
      const mockProps = {
        "data-testId": "chip-test-id",
        label: "Test label",
        onDelete: vi.fn(),
        size,
      };
      renderChipComponent(mockProps);
      const chipElement = screen.getByTestId(mockProps["data-testId"]);
      expect(chipElement).toBeVisible();
      switch(size) {
        case "small":
          expect(chipElement).toHaveClass(
            "ps-1.5",
            "pe-1",
          );
          break;
        case "medium":
          expect(chipElement).toHaveClass(
            "ps-2.5",
            "pe-1.5",
          );
          break;
        case "large":
          expect(chipElement).toHaveClass(
            "ps-3",
            "pe-2",
          );
          break;
      }
    });

    it(`should have styles to chip with avatar for size=${size}`, () => {
      const avatarTestId = "avatar-test-id";
      const mockProps = {
        "data-testId": "chip-test-id",
        avatar: <Avatar data-testId={avatarTestId}>JD</Avatar>,
        label: "Test label",
        size,
      };
      renderChipComponent(mockProps);
      const chipElement = screen.getByTestId(mockProps["data-testId"]);
      expect(chipElement).toBeVisible();
      const chipLabelElement = chipElement.childNodes[1];
      expect(chipLabelElement).toBeVisible();
      expect(chipLabelElement).toHaveTextContent(mockProps.label);
      switch(size) {
        case "small":
          expect(chipElement).toHaveClass("ps-[2px]");
          expect(chipLabelElement).toHaveClass("ps-[1px]");
          break;
        case "medium":
          expect(chipElement).toHaveClass("ps-[3px]");
          expect(chipLabelElement).toHaveClass("ps-[2px]");
          break;
        case "large":
          expect(chipElement).toHaveClass("ps-1");
          expect(chipLabelElement).toHaveClass("ps-[3px]");
          break;
      }
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
      onDelete: vi.fn(),
      slotProps: {
        deleteIcon: { "data-testId": "delete-icon-slot-id", class: "test-class-delete-icon", },
        label: { "data-testId": "label-slot-id", class: "test-class-label", },
      },
    };
    renderChipComponent(mockProps);
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    const deleteIconSlotElement = within(
      chipElement
    ).getByTestId(mockProps.slotProps.deleteIcon["data-testId"]);
    expect(deleteIconSlotElement).toBeVisible();
    expect(deleteIconSlotElement).toHaveClass(mockProps.slotProps.deleteIcon.class);
    const labelSlotElement = within(
      chipElement
    ).getByTestId(mockProps.slotProps.label["data-testId"]);
    expect(labelSlotElement).toBeVisible();
    expect(labelSlotElement).toHaveClass(mockProps.slotProps.label.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
    const mockProps = {
      "data-testId": "chip-test-id",
      label: "Test label",
    };
    const theme = createTheme({
      colors: {
        default: {
          filled: {
            background: customClass,
          }
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Chip
          {...mockProps}
        />
      </ThemeProvider>
    ));
    const chipElement = screen.getByTestId(mockProps["data-testId"]);
    expect(chipElement).toBeVisible();
    expect(chipElement).toHaveClass(customClass);
  });
});