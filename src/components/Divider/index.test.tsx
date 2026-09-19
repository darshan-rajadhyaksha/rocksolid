import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Divider, { type DividerProps } from "@/components/Divider";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const aligns = [
  "start",
  "center",
  "end",
] as const;

const orientations = [
  "horizontal",
  "vertical",
] as const;

const renderDividerComponent = (
  props?: DividerProps<"div">,
) => {
  return render(() => (
    <Divider {...props} />
  ));
};

describe("Divider component", () => {
  it("should render the divider", () => {
    const slotProps = {
      divider: { "data-testId": "divider-slot-id" },
    };
    renderDividerComponent({ slotProps });
    const dividerElement = screen.getByRole("separator");
    expect(dividerElement).toBeVisible();
    expect(dividerElement).toHaveClass(
      "flex",
      "items-center",
      "gap-1.5",
      theme.typography.colors.textPrimary,
      theme.typography.variants.body2,
    );
    const dividerSlotElement = within(dividerElement).getByTestId(
      slotProps.divider["data-testId"]
    );
    expect(dividerSlotElement).toBeVisible();
    expect(dividerSlotElement).toHaveClass(theme.divider);
  });

  /** class prop */
  it("should apply custom class to divider element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderDividerComponent(mockProps);
    const dividerElement = screen.getByRole("separator");
    expect(dividerElement).toBeVisible();
    expect(dividerElement).toHaveClass(mockProps.class);
  });

  /** align & orientation prop */
  aligns.forEach((align) => {
    orientations.forEach((orientation) => {
      it("should display divider element with"
        + `align=${align} and orientation=${orientation}`, () => {
        const slotProps = {
          divider: { "data-testId": "divider-slot-id" },
        };
        const mockProps = {
          class: "test-class",
          align,
          orientation,
          slotProps,
          children: "Hello World",
        };
        renderDividerComponent(mockProps);
        const dividerElement = screen.getByRole("separator");
        expect(dividerElement).toBeVisible();
        expect(dividerElement).toHaveTextContent(mockProps.children);
        expect(dividerElement).toHaveAttribute("aria-orientation", orientation);
        const [
          beforeDividerSlotElement,
          afterDividerSlotElement,
        ] = within(dividerElement).getAllByTestId(
          slotProps.divider["data-testId"]
        );
        expect(beforeDividerSlotElement).toBeVisible();
        expect(afterDividerSlotElement).toBeVisible();
        if (orientation === "horizontal") {
          expect(dividerElement).toHaveClass("w-full");
          switch(align) {
            case "start":
              expect(beforeDividerSlotElement).toHaveClass("w-[10%]");
              expect(afterDividerSlotElement).toHaveClass("w-[90%]");
              break;
            case "center":
              expect(beforeDividerSlotElement).toHaveClass("w-[50%]");
              expect(afterDividerSlotElement).toHaveClass("w-[50%]");
              break;
            case "end":
              expect(beforeDividerSlotElement).toHaveClass("w-[90%]");
              expect(afterDividerSlotElement).toHaveClass("w-[10%]");
              break;
          }
        } else {
          expect(dividerElement).toHaveClass(
            "h-auto",
            "self-stretch",
          );
          switch(align) {
            case "start":
              expect(beforeDividerSlotElement).toHaveClass("h-[10%]");
              expect(afterDividerSlotElement).toHaveClass("h-[90%]");
              break;
            case "center":
              expect(beforeDividerSlotElement).toHaveClass("h-[50%]");
              expect(afterDividerSlotElement).toHaveClass("h-[50%]");
              break;
            case "end":
              expect(beforeDividerSlotElement).toHaveClass("h-[90%]");
              expect(afterDividerSlotElement).toHaveClass("h-[10%]");
              break;
          }
        }
      });
    });
  });

  /** slotProps prop */
  it("should apply props to slots", async () => {
    const slotProps = {
      divider: { "data-testId": "divider-slot-id", class: "test-class-divider", },
    };
    renderDividerComponent({ slotProps });
    const dividerElement = screen.getByRole("separator");
    expect(dividerElement).toBeVisible();
    const dividerSlotElement = within(dividerElement).getByTestId(
      slotProps.divider["data-testId"]
    );
    expect(dividerSlotElement).toBeVisible();
    expect(dividerSlotElement).toHaveClass(slotProps.divider.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      typography: {
        colors: {
          textPrimary: customClass,
        },
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Divider />
      </ThemeProvider>
    ));
    const dividerElement = screen.getByRole("separator");
    expect(dividerElement).toBeVisible();
    expect(dividerElement).toHaveClass(customClass);
  });
});