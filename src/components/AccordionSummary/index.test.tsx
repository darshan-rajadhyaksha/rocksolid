import { describe, it, expect } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Accordion, { type AccordionProps } from "@/components/Accordion";
import AccordionSummary, { type AccordionSummaryProps } from "@/components/AccordionSummary";
import AccordionDetails from "@/components/AccordionDetails";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const mockAccordionSummary = "What is gravity?";
const mockAccordionDetails = "Gravity is a force that attracts objects with mass toward one another.";

const renderAccordionSummaryComponent = (
  props?: AccordionSummaryProps & WithExtendedComponentProps,
  accordionProps?: AccordionProps,
) => {
  return render(() => (
    <Accordion
      {...accordionProps}
    >
      <AccordionSummary
        {...props}
      >
        {mockAccordionSummary}
      </AccordionSummary>
      <AccordionDetails>
        {mockAccordionDetails}
      </AccordionDetails>
    </Accordion>
  ));
};

describe("AccordionSummary component", () => {
  it("should render the accordion summary", () => {
    const mockProps = {
      "data-testId": "accordion-summary-test-id",
    };
    renderAccordionSummaryComponent(mockProps);
    const accordionSummaryBaseElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionSummaryBaseElement).toBeVisible();
    const accordionSummaryElement = within(accordionSummaryBaseElement).getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveClass(
      "px-3",
      "h-full",
      "min-h-10",
      "justify-between",
      "gap-2",
      "text-left rtl:text-right",
      theme.rounded.small,
    );
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
  });

  /** class prop */
  it("should apply custom class to accordion summary element", () => {
    const mockProps = {
      "data-testId": "accordion-summary-test-id",
      class: "test-class",
    };
    renderAccordionSummaryComponent(mockProps);
    const accordionSummaryBaseElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionSummaryBaseElement).toBeVisible();
    expect(accordionSummaryBaseElement).toHaveClass(mockProps.class);
  });

  /** collapsedIcon and expandedIcon prop */
  it("should apply custom collapse and expanded icon to accordion summary element", async () => {
    const collapsedIconTestId = "accordion-collapsed-icon-test-id";
    const expandedIconTestId = "accordion-expanded-icon-test-id";
    const mockProps = {
      "data-testId": "accordion-summary-test-id",
      collapsedIcon: <span data-testId={collapsedIconTestId} />,
      expandedIcon: <span data-testId={expandedIconTestId} />,
    };
    renderAccordionSummaryComponent(mockProps);
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
    const collapsedIconElement = within(accordionSummaryElement).getByTestId(collapsedIconTestId);
    expect(collapsedIconElement).toBeVisible();
    const expandedIconElement = within(accordionSummaryElement).queryByTestId(expandedIconTestId);
    expect(expandedIconElement).toBeNull();
    const accordionDetailsElement = screen.getByText(mockAccordionDetails);
    expect(accordionDetailsElement).toBeVisible();
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "true");
    expect(
      within(accordionSummaryElement).queryByTestId(collapsedIconTestId)
    ).toBeNull();
    expect(
      within(accordionSummaryElement).getByTestId(expandedIconTestId)
    ).toBeVisible();
  });

  /** disabled prop */
  it("should make accordion summary disabled", async () => {
    renderAccordionSummaryComponent({}, { disabled: true });
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toBeDisabled();
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      button: {
        "data-testId": "test-button-id",
        class: "test-class",
      },
      icon: { "data-testId": "test-icon-id" },
    };
    renderAccordionSummaryComponent({ slotProps });
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("data-testId", slotProps.button["data-testId"]);
    expect(accordionSummaryElement).toHaveClass(slotProps.button.class);
    const iconSlotElement = within(accordionSummaryElement).getByTestId(slotProps.icon["data-testId"]);
    expect(iconSlotElement).toBeVisible();
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "rounded-[2px]";
    const theme = createTheme({
      rounded: {
        small: customClass,
      }
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Accordion>
          <AccordionSummary>
            {mockAccordionSummary}
          </AccordionSummary>
          <AccordionDetails>
            {mockAccordionDetails}
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    ));
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveClass(customClass);
  });
});