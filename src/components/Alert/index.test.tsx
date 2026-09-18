import type { JSXElement, ValidComponent } from "solid-js";
import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Alert, { type AlertProps } from "@/components/Alert";
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
] as const;

vi.mock("@/components/icons/Alert", () => ({
  default: () => <span data-testId="alert-default-icon" />
}));

vi.mock("@/components/icons/Checkmark", () => ({
  default: () => <span data-testId="alert-success-icon" />
}));

vi.mock("@/components/icons/Warning", () => ({
  default: () => <span data-testId="alert-warning-icon" />
}));

vi.mock("@/components/icons/Info", () => ({
  default: () => <span data-testId="alert-info-icon" />
}));

vi.mock("@/components/icons/Error", () => ({
  default: () => <span data-testId="alert-error-icon" />
}));

const mockAlertMessage = "Test alert message";

const renderAlertComponent = <T extends ValidComponent>(
  props: AlertProps<T>,
  children: JSXElement = mockAlertMessage,
) => {
  return render(() => (
    <Alert {...props}>
      {children}
    </Alert>
  ));
};

describe("Alert component", () => {
  it("should render the alert", () => {
    const mockProps = {
      slotProps: {
        icon: { "data-testId": "alert-icon-slot-id" },
        content: { "data-testId": "alert-content-slot-id" },
      }
    };
    renderAlertComponent(mockProps);
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    expect(alertElement).toHaveTextContent(mockAlertMessage);
    expect(alertElement).toHaveClass(
      "flex",
      "items-center",
      "gap-2",
      "w-full",
      "py-2",
      "px-3",
      "min-w-0",
      "min-h-10",
      theme.rounded.small,
      theme.typography.variants.body2,
    );
    const iconSlotElement = within(
      alertElement
    ).getByTestId(mockProps.slotProps.icon["data-testId"]);
    expect(iconSlotElement).toBeVisible();
    expect(iconSlotElement).toHaveClass(
      "text-lg",
      "shrink-0",
    );
    const contentSlotElement = within(
      alertElement
    ).getByTestId(mockProps.slotProps.content["data-testId"]);
    expect(contentSlotElement).toBeVisible();
    expect(contentSlotElement).toHaveClass(
      "grow-1",
      "min-w-0",
    );
  });

  /** action prop */
  it("should add custom action in alert", () => {
    const downloadAction = <button>Download</button>;
    renderAlertComponent({ action: downloadAction });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    const downloadActionElement = within(
      alertElement
    ).getByRole("button", {
      name: "Download",
    });
    expect(downloadActionElement).toBeVisible();
  });

  /** as prop */
  it("should render the alert component with 'p' element", () => {
    renderAlertComponent({ as: "p" });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    expect(alertElement.tagName.toLowerCase()).toBe("p");
  });

  /** class prop */
  it("should apply custom class to alert element", () => {
    const customClass = "test-class";
    renderAlertComponent({ class: customClass });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    expect(alertElement).toHaveClass(customClass);
  });

  /** color & variant prop */
  colors.forEach((color) => {
    variants.forEach((variant) => {
      it(`should render alert with color=${color} and variant=${variant}`, () => {
        renderAlertComponent({
          color,
          variant,
        });
        const alertElement = screen.getByRole("alert");
        expect(alertElement).toBeVisible();
        /** Asset classes */
        expect(alertElement).toHaveClass(
          theme.colors[color][variant].background,
          theme.colors[color][variant].border,
          theme.colors[color][variant].text,
        );
        /** Assert icon */
        const iconElement = within(
          alertElement
        ).getByTestId(
          `alert-${color}-icon`
        );
        expect(iconElement).toBeVisible();
      });
    });
  });

  /** icon prop */
  it("should set custom icon", () => {
    const icon = <span data-testId="custom-icon">+</span>;
    renderAlertComponent({ icon });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    const customIconElement = within(
      alertElement
    ).getByTestId("custom-icon");
    expect(customIconElement).toBeVisible();
  });

  it("shound remove the icon from alert", () => {
    renderAlertComponent({ icon: null });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    const iconElement = within(
      alertElement
    ).queryByTestId("alert-default-icon");
    expect(iconElement).toBeNull();
  });

  /** onClose prop */
  it("should add close button when onClose prop is added", async () => {
    const handleClose = vi.fn();
    renderAlertComponent({ onClose: handleClose });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    const closeButtonElement = within(
      alertElement
    ).getByRole("button");
    expect(closeButtonElement).toBeVisible();
    await userEvent.click(closeButtonElement);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const downloadAction = <button>Download</button>;
    const handleClose = vi.fn();
    const slotProps = {
      icon: { "data-testId": "test-icon-id", class: "test-class-icon", },
      content: { "data-testId": "test-content-id", class: "test-class-content", },
      action: { "data-testId": "test-action-id", class: "test-class-action", },
      closeButton: { "data-testId": "test-close-button-id", class: "test-class-close-button", },
    };
    renderAlertComponent({
      action: downloadAction,
      onClose: handleClose,
      slotProps,
    });
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    Object.entries(slotProps)
    .forEach(([_slotName, slotProps]) => {
      const slotElement = within(
        alertElement
      ).getByTestId(slotProps["data-testId"]);
      expect(slotElement).toBeVisible();
      expect(slotElement).toHaveClass(slotProps.class);
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
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
        <Alert>
          {mockAlertMessage}
        </Alert>
      </ThemeProvider>
    ));
    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeVisible();
    expect(alertElement).toHaveClass(customClass);
  });
});