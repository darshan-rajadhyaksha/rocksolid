import { createSignal } from "solid-js";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";
import Dialog, { type DialogProps } from "@/components/Dialog";
import DialogActions from "@/components/DialogActions";
import DialogContent from "@/components/DialogContent";
import DialogTitle from "@/components/DialogTitle";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderDialogComponent = (
  props?: DialogProps,
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
          {...props}
        >
          <DialogTitle id="test-dialog-title">
            Getting Started
          </DialogTitle>
          <DialogContent>
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

describe("Dialog component", () => {
  it("should render the dialog component", async () => {
    renderDialogComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    Object.entries({
      "aria-labelledby": "test-dialog-title",
      "aria-modal": "true",
      role: "dialog",
    }).forEach(([key, value]) => {
      expect(dialogElement).toHaveAttribute(key, value);
    });
    expect(dialogElement).toHaveClass(
      "fixed",
      "min-w-xs",
      "shadow-sm",
      "z-2",
      "bg-white",
      "dark:bg-neutral-900",
      "dark:border",
      "top-1/2",
      "left-1/2",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "max-w-[calc(100vw_-_2rem)]",
      "max-h-[calc(100vh_-_2rem)]",
      theme.rounded.small,
      theme.divider,
    );
  });

  /** class prop */
  it("should set custom class to dialog", async () => {
    const customClass = "test-class";
    renderDialogComponent({
      class: customClass,
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    expect(dialogElement).toHaveClass(customClass);
  });

  /** fullScreen prop */
  it("should display dialog in fullscreen", async () => {
    renderDialogComponent({
      fullscreen: true,
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    expect(dialogElement).toHaveClass(
      "w-full",
      "h-full",
    );
  });

  /** role prop */
  it("should display dialog in fullscreen", async () => {
    renderDialogComponent({
      role: "alertdialog",
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByRole("alertdialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const alertdialogElement = screen.getByRole("alertdialog");
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(alertdialogElement).toBeVisible();
  });

  /** slotProps prop */
  it("should apply props to slots", async () => {
    const slotProps = {
      backdrop: {
        "data-testId": "test-button-id",
        class: "test-class",
      },
    };
    renderDialogComponent({
      slotProps,
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const backdropElement = screen.getByTestId(slotProps.backdrop["data-testId"]);
    expect(backdropElement).toBeVisible();
    expect(backdropElement).toHaveClass(slotProps.backdrop.class);
    expect(dialogElement.parentElement).toBe(backdropElement);
  });

  /** focus trapping */
  it("should trap the focus inside the dialog", async () => {
    renderDialogComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const goToSetupButtonElement = within(dialogElement).getByRole("button", {
      name: "Go to Setup",
    });
    const closeButtonElement = within(dialogElement).getByRole("button", {
      name: "Close",
    });
    goToSetupButtonElement.focus();
    expect(goToSetupButtonElement).toHaveFocus();
    await userEvent.tab();
    expect(closeButtonElement).toHaveFocus();
    await userEvent.tab();
    expect(goToSetupButtonElement).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(closeButtonElement).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(goToSetupButtonElement).toHaveFocus();
    /**
     * it should restore focus back inside dialog 
     * if unexpectedly focus set outside of dialog when its open
     */
    dialogTriggerElement.focus();
    expect(goToSetupButtonElement).toHaveFocus();
  });

  it("should focus the first focusable element inside the dialog", async () => {
    renderDialogComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const goToSetupButtonElement = within(dialogElement).getByRole("button", {
      name: "Go to Setup",
    });
    await userEvent.tab();
    expect(goToSetupButtonElement).toHaveFocus();
  });

  it("should focus the last focusable element inside the dialog", async () => {
    renderDialogComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const closeButtonElement = within(dialogElement).getByRole("button", {
      name: "Close",
    });
    await userEvent.tab({ shift: true });
    expect(closeButtonElement).toHaveFocus();
  });

  /** closing dialog */
  it("should call onClose callback when escape is pressed", async () => {
    renderDialogComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("should not close the dialog if dialog or its inside elements are clicked", async () => {
    renderDialogComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const goToSetupButtonElement = within(dialogElement).getByRole("button", {
      name: "Go to Setup",
    });
    await userEvent.click(goToSetupButtonElement);
    expect(screen.queryByRole("dialog")).not.toBeNull();
    await userEvent.click(dialogElement);
    expect(screen.queryByRole("dialog")).not.toBeNull();
    expect(dialogElement).toBeVisible();
  });

  it("should call onClose callback when backdrop is clicked", async () => {
    const slotProps = {
      backdrop: {
        "data-testId": "test-button-id",
        class: "test-class",
      },
    };
    renderDialogComponent({
      slotProps,
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const backdropElement = screen.getByTestId(slotProps.backdrop["data-testId"]);
    expect(backdropElement).toBeVisible();
    expect(backdropElement).toHaveClass(slotProps.backdrop.class);
    await userEvent.click(backdropElement);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  /** theme overrides */  
  it("should apply styles overrides if wrapped inside ThemeProvider", async () => {
    const customClass = "rounded-[2px]";
    const theme = createTheme({
      rounded: {
        small: customClass,
      }
    });
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
    expect(dialogElement).toHaveClass(customClass);
  });
});