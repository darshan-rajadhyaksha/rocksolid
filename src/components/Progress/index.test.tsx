import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Progress, { type ProgressProps } from "@/components/Progress";
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

const renderProgressComponent = (
  props?: ProgressProps,
) => {
  return render(() => (
    <Progress {...props} />
  ));
};

describe("Progress component", () => {
  it("should render the progress", () => {
    renderProgressComponent();
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeVisible();
    expect(progressElement).toHaveAttribute("aria-valuemax", "100");
    expect(progressElement).toHaveAttribute("aria-valuemin", "0");
    expect(progressElement).toHaveAttribute("aria-valuenow", "0");
    expect(progressElement).toHaveClass(
      "block",
      "w-full",
      "overflow-hidden",
      "bg-neutral-300",
      "dark:bg-neutral-700",
      theme.rounded.full,
    );
    const fillElement = progressElement.childNodes[0];
    expect(fillElement).toBeVisible();
    expect(fillElement).toHaveClass(
      "block",
      "h-full",
      "rounded-[inherit]",
      "transition-[width]",
      "duration-150",
    );
  });

  /** class prop */
  it("should apply custom class to progress element", () => {
    const mockProps = {
      class: "test-class",
    };
    renderProgressComponent(mockProps);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeVisible();
    expect(progressElement).toHaveClass(mockProps.class);
  });

    /** color prop */
  colors.forEach((color) => {
    it(`should render progress with color=${color}`, () => {
      const mockProps = {
        color,
      };
      renderProgressComponent(mockProps);
      const progressElement = screen.getByRole("progressbar");
      expect(progressElement).toBeVisible();
      const fillElement = progressElement.childNodes[0];
      expect(fillElement).toBeVisible();
      expect(fillElement).toHaveClass(
        theme.colors[color].solid.background,
      );
    });
  });

  /** min & max prop */
  it("should set min and max of the progress", () => {
    const mockProps = {
      min: 10,
      max: 20,
      value: 15,
    };
    renderProgressComponent(mockProps);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeVisible();
    expect(progressElement).toHaveAttribute("aria-valuemax", `${mockProps.max}`);
    expect(progressElement).toHaveAttribute("aria-valuemin", `${mockProps.min}`);
    expect(progressElement).toHaveAttribute("aria-valuenow", `${mockProps.value}`);
    const fillElement = progressElement.childNodes[0];
    expect(fillElement).toBeVisible();
    expect(fillElement).toHaveStyle({
      width: "50%",
    });
  });

  /** value prop */
  it("should set value of the progress", () => {
    const mockProps = {
      value: 50,
    };
    renderProgressComponent(mockProps);
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeVisible();
    expect(progressElement).toHaveAttribute("aria-valuemax", "100");
    expect(progressElement).toHaveAttribute("aria-valuemin", "0");
    expect(progressElement).toHaveAttribute("aria-valuenow", `${mockProps.value}`);
    const fillElement = progressElement.childNodes[0];
    expect(fillElement).toBeVisible();
    expect(fillElement).toHaveStyle({
      width: `${mockProps.value}%`,
    });
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render progress with size=${size}`, () => {
      const mockProps = {
        size,
      };
      renderProgressComponent(mockProps);
      const progressElement = screen.getByRole("progressbar");
      expect(progressElement).toBeVisible();
      switch(size) {
        case "small":
          expect(progressElement).toHaveClass(
            "h-1",
          );
          break;
        case "medium":
          expect(progressElement).toHaveClass(
            "h-2",
          );
          break;
        case "large":
          expect(progressElement).toHaveClass(
            "h-4",
          );
          break;
      }
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      fill: { "data-testId": "test-base-slot-id", class: "test-class-fill", },
    };
    renderProgressComponent({ slotProps });
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeVisible();
    const fillElement = screen.getByTestId(slotProps.fill["data-testId"]);
    expect(progressElement.childNodes[0]).toBe(fillElement);
    expect(fillElement).toHaveClass(slotProps.fill.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          solid: {
            background: customClass,
          },
        },
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Progress />
      </ThemeProvider>
    ));
    const progressElement = screen.getByRole("progressbar");
    expect(progressElement).toBeVisible();
    const fillElement = progressElement.childNodes[0];
    expect(fillElement).toBeVisible();
    expect(fillElement).toHaveClass(customClass);
  });
});