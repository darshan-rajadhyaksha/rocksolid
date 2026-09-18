import { createSignal } from "solid-js";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import DialogActions, { type DialogActionsProps } from "@/components/DialogActions";
import DialogContent from "@/components/DialogContent";
import DialogTitle from "@/components/DialogTitle";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const renderDialogActionsComponent = (
  props?: DialogActionsProps & WithExtendedComponentProps,
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
          <DialogContent>
            Complete the setup to access all available features.
          </DialogContent>
          <DialogActions
            {...props}
          >
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

describe("DialogActions component", () => {
  it("should render the dialog action component", async () => {
    const mockProps = {
      "data-testId": "dialog-action-test-id",
    };
    renderDialogActionsComponent(mockProps);
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogActionsElement = within(dialogElement).getByTestId(mockProps["data-testId"]);
    expect(dialogActionsElement).toHaveClass(
      "flex",
      "items-center",
      "justify-end",
      "gap-3",
      "border-t",
      "py-2.5",
      "px-3",
      theme.divider,
    );
  });

  /** class prop */
  it("should set custom class to dialog actions", async () => {
    const customClass = "test-class";
    const mockProps = {
      "data-testId": "dialog-action-test-id",
      class: customClass,
    };
    renderDialogActionsComponent(mockProps);
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogActionsElement = within(dialogElement).getByTestId(mockProps["data-testId"]);
    expect(dialogActionsElement).toHaveClass(customClass);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", async () => {
    const customClass = "border-zinc-500";
    const theme = createTheme({
      divider: customClass,
    });
    const mockProps = {
      "data-testId": "dialog-actions-test-id",
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
            <DialogContent>
              Complete the setup to access all available features.
            </DialogContent>
            <DialogActions
              {...mockProps}
            >
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
    const dialogActionsElement = within(dialogElement).getByTestId(mockProps["data-testId"]);
    expect(dialogActionsElement).toHaveClass(customClass);
  });
});