import { createSignal, type ValidComponent } from "solid-js";
import { describe, it, expect } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import DialogActions from "@/components/DialogActions";
import DialogContent from "@/components/DialogContent";
import DialogTitle, { type DialogTitleProps } from "@/components/DialogTitle";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderDialogTitleComponent = <T extends ValidComponent>(
  props?: DialogTitleProps<T>,
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
            {...props}
          >
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

describe("DialogTitle component", () => {
  it("should render the dialog title component", async () => {
    renderDialogTitleComponent();
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogTitleElement = within(dialogElement).getByRole("heading");
    expect(dialogTitleElement.tagName.toLowerCase()).toBe("h3");
    expect(dialogTitleElement).toHaveTextContent("Getting Started");
    expect(dialogTitleElement).toHaveClass(
      "p-3",
      "text-md",
      "font-semibold",
      "border-b",
      theme.divider,
      theme.typography.colors.textPrimary,
    );
  });

  /** as prop */
  it("should render dialog title with 'p' tag", async () => {
    const mockProps = {
      as: "p" as const,
    };
    renderDialogTitleComponent(mockProps);
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogTitleElement = within(dialogElement).getByText("Getting Started");
    expect(dialogTitleElement.tagName.toLowerCase()).toBe(mockProps.as);
  });


  /** class prop */
  it("should set custom class to dialog title", async () => {
    const customClass = "test-class";
    renderDialogTitleComponent({
      class: customClass,
    });
    const dialogTriggerElement = screen.getByRole("button", { name: "Open dialog" });
    expect(dialogTriggerElement).toBeVisible();
    expect(screen.queryByRole("dialog")).toBeNull();
    await userEvent.click(dialogTriggerElement);
    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeVisible();
    const dialogTitleElement = within(dialogElement).getByRole("heading");
    expect(dialogTitleElement).toHaveClass(customClass);
  });
  
  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", async () => {
    const customClass = "border-zinc-500";
    const theme = createTheme({
      divider: customClass,
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
    const dialogTitleElement = within(dialogElement).getByRole("heading");
    expect(dialogTitleElement).toHaveClass(customClass);
  });
});