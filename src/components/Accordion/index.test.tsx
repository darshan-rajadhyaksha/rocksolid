import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Accordion, { type AccordionProps } from "@/components/Accordion";
import AccordionSummary from "@/components/AccordionSummary";
import AccordionDetails from "@/components/AccordionDetails";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const mockAccordionSummary = "What is gravity?";
const mockAccordionDetails = "Gravity is a force that attracts objects with mass toward one another.";

const renderAccordionComponent = (
  props?: AccordionProps & WithExtendedComponentProps,
) => {
  return render(() => (
    <Accordion
      {...props}
    >
      <AccordionSummary>
        {mockAccordionSummary}
      </AccordionSummary>
      <AccordionDetails>
        {mockAccordionDetails}
      </AccordionDetails>
    </Accordion>
  ));
};

describe("Accordion component", () => {
  it("should render the accordion", () => {
    const mockProps = {
      "data-testId": "accordion-test-id",
    };
    renderAccordionComponent(mockProps);
    const accordionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionElement).toBeVisible();
    expect(accordionElement).toHaveClass(
      "border-t",
      "border-l",
      "border-r",
      "first-of-type:rounded-t-sm",
      "last-of-type:border-b",
      "last-of-type:rounded-b-sm",
      theme.divider,
    );
    const accordionSummaryElement = within(accordionElement).getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    const accordionDetailsElement = within(accordionElement).getByText(mockAccordionDetails);
    expect(accordionDetailsElement).toBeVisible();
  });

  /** accordionId prop */
  it("shoud add aria attributes when accordionId is provided", () => {
    const mockProps = {
      accordionId: "test-accordion",
    };
    renderAccordionComponent(mockProps);
    const accordionSummaryElement = screen.getByRole("button", { name: mockAccordionSummary });
    expect(accordionSummaryElement).toBeVisible();
    Object.entries({
      "aria-expanded": "false",
      "aria-controls": `accordion-${mockProps.accordionId}-details`,
      id: `accordion-${mockProps.accordionId}-summary`,
    }).forEach(([key, value]) => {
      expect(accordionSummaryElement).toHaveAttribute(key, value);
    });
    const accordionDetailsElement = screen.getByText(mockAccordionDetails);
    expect(accordionDetailsElement).toBeVisible();
    Object.entries({
      "aria-labelledby": `accordion-${mockProps.accordionId}-summary`,
      id: `accordion-${mockProps.accordionId}-details`,
      role: "region",
    }).forEach(([key, value]) => {
      expect(accordionDetailsElement.parentElement).toHaveAttribute(key, value);
    });
  });

  /** class prop */
  it("should apply custom class to accordion element", () => {
    const mockProps = {
      "data-testId": "accordion-test-id",
      class: "test-class",
    };
    renderAccordionComponent(mockProps);
    const accordionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionElement).toBeVisible();
    expect(accordionElement).toHaveClass(mockProps.class);
  });

  /** defaultExpanded */
  it("should keep accordion expanded by defualt", async () => {
    const mockProps = {
      "data-testId": "accordion-test-id",
      defaultExpanded: true,
    };
    renderAccordionComponent(mockProps);
    const accordionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionElement).toBeVisible();
    const accordionSummaryElement = within(accordionElement).getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "true");
    const accordionDetailsElement = within(accordionElement).getByText(mockAccordionDetails);
    expect(accordionDetailsElement).toBeVisible();
    expect(accordionDetailsElement.parentElement).toHaveClass("h-auto");
  });

  /** disabled prop */
  it("should make accordion disabled", async () => {
    const mockProps = {
      "data-testId": "accordion-test-id",
      disabled: true,
    };
    renderAccordionComponent(mockProps);
    const accordionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionElement).toBeVisible();
    const accordionSummaryElement = within(accordionElement).getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toBeDisabled();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
    const accordionDetailsElement = within(accordionElement).getByText(mockAccordionDetails);
    expect(accordionDetailsElement).toBeVisible();
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
  });

  /** expanded and onChange prop */
  it("should set accordion expanded and call onChange callback", async () => {
    const mockProps = {
      "data-testId": "accordion-test-id",
      expanded: false,
      onChange: vi.fn(),
    };
    renderAccordionComponent(mockProps);
    const accordionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionElement).toBeVisible();
    const accordionSummaryElement = within(accordionElement).getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
    const accordionDetailsElement = within(accordionElement).getByText(mockAccordionDetails);
    expect(accordionDetailsElement).toBeVisible();
    await userEvent.click(accordionSummaryElement);
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          tagName: "BUTTON",
        }),
      }),
      true,
    );
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "border-zinc-500";
    const mockProps = {
      "data-testId": "accordion-test-id",
    };
    const theme = createTheme({
      divider: customClass,
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Accordion
          {...mockProps}
        >
          <AccordionSummary>
            {mockAccordionSummary}
          </AccordionSummary>
          <AccordionDetails>
            {mockAccordionDetails}
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    ));
    const accordionElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionElement).toBeVisible();
    expect(accordionElement).toHaveClass(customClass)
  });
});