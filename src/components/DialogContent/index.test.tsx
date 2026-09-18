import { createSignal } from "solid-js";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import DialogActions from "@/components/DialogActions";
import DialogContent, { type DialogContentProps } from "@/components/DialogContent";
import DialogTitle from "@/components/DialogTitle";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const renderDialogContentComponent = (
  props?: DialogContentProps & WithExtendedComponentProps,
) => {
  return render(() => {
    const [open, setOpen] = createSignal(false);
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
        >
          Open dialog
        </Button>
        <Dialog
          open={open()}
          aria-labelledby="test-dialog-title"
          onClose={() => setOpen(false)}
        >
          <DialogTitle
            id="test-dialog-title"
          >
            Getting Started
          </DialogTitle>
          <DialogContent
            {...props}
          >
            Complete the setup to access all available features.
          </DialogContent>
          <DialogActions>
            <Button>
              Go to Setup
            </Button>
            <Button
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  });
};

describe("DialogContent component", () => {
  it("should render the dialog content component", async () => {
    const mockProps = {
      "data-testId": "dialog-content-test-id",
    };
    renderDialogContentComponent(mockProps);
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogContentElement = within(dialogElement).getByTestId(mockProps["data-testId"]);
    expect(dialogContentElement).toHaveTextContent(
      "Complete the setup to access all available features."
    );
    expect(dialogContentElement).toHaveClass(
      "px-3",
      "py-5",
      theme.typography.variants.body2,
      theme.typography.colors.textSecondary,
    );
  });

  /** class prop */
  it("should set custom class to dialog content", async () => {
    const customClass = "test-class";
    const mockProps = {
      "data-testId": "dialog-content-test-id",
      class: customClass,
    };
    renderDialogContentComponent(mockProps);
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogContentElement = within(dialogElement).getByTestId(mockProps["data-testId"]);
    expect(dialogContentElement).toHaveClass(customClass);
  });
  
  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", async () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      typography: {
        colors: {
          textSecondary: customClass,
        },
      },
    });
    const mockProps = {
      "data-testId": "dialog-content-test-id",
    };
    render(() => {
      const [open, setOpen] = createSignal(false);
      return (
        <ThemeProvider theme={theme}>
          <Button
            onClick={() => setOpen(true)}
          >
            Open dialog
          </Button>
          <Dialog
            open={open()}
            aria-labelledby="test-dialog-title"
            onClose={() => setOpen(false)}
          >
            <DialogTitle id="test-dialog-title">
              Getting Started
            </DialogTitle>
            <DialogContent
              {...mockProps}
            >
              Complete the setup to access all available features.
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </ThemeProvider>
      );
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogContentElement = within(dialogElement).getByTestId(mockProps["data-testId"]);
    expect(dialogContentElement).toHaveClass(customClass);
  });
});