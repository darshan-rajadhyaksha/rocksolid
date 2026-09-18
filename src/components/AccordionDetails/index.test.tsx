import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Accordion, { type AccordionProps } from "@/components/Accordion";
import AccordionSummary from "@/components/AccordionSummary";
import AccordionDetails, { type AccordionDetailsProps } from "@/components/AccordionDetails";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const mockAccordionSummary = "What is gravity?";
const mockAccordionDetails = "Gravity is a force that attracts objects with mass toward one another.";

const renderAccordionDetailsComponent = (
  props?: AccordionDetailsProps & WithExtendedComponentProps,
  accordionProps?: AccordionProps,
) => {
  return render(() => (
    <Accordion
      {...accordionProps}
    >
      <AccordionSummary>
        {mockAccordionSummary}
      </AccordionSummary>
      <AccordionDetails
        {...props as AccordionDetailsProps}
      >
        {mockAccordionDetails}
      </AccordionDetails>
    </Accordion>
  ));
};

describe("AccordionDetails component", () => {
  it("should render the accordion details", () => {
    const mockProps = {
      "data-testId": "accordion-details-test-id",
    };
    renderAccordionDetailsComponent(mockProps);
    const accordionDetailsElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionDetailsElement).toBeVisible();
    expect(accordionDetailsElement).toHaveClass(
      "overflow-hidden",
      theme.typography.colors.textPrimary,
    );
  });

  /** class prop */
  it("should apply custom class to accordion details element", () => {
    const mockProps = {
      "data-testId": "accordion-details-test-id",
      class: "test-class",
    };
    renderAccordionDetailsComponent(mockProps);
    const accordionDetailsElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionDetailsElement).toBeVisible();
    expect(accordionDetailsElement).toHaveClass(mockProps.class);
  });

  /** height of accoridon details */
  it("should set height of accordion details when expanded", async () => {
    const mockProps = {
      "data-testId": "accordion-details-test-id",
    };
    renderAccordionDetailsComponent(mockProps);
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");    
    const accordionDetailsElement = screen.getByText(mockAccordionDetails);
    Object.defineProperty(accordionDetailsElement.parentElement, "scrollHeight", {
      configurable: true,
      value: 500,
    });
    expect(accordionDetailsElement).toBeVisible();
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "true");
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "500px",
    });
    await new Promise(resolve => setTimeout(resolve, 300));
    const event = new Event("transitionend");
    Object.defineProperty(event, "propertyName", { value: "height" });
    (accordionDetailsElement.parentElement as HTMLElement).dispatchEvent(event);
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "auto",
    });
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "0px",
    });
  });

  it("should not set height to auto if collapsed before transition completes", async () => {
    const mockProps = {
      "data-testId": "accordion-details-test-id",
    };
    renderAccordionDetailsComponent(mockProps);
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");    
    const accordionDetailsElement = screen.getByText(mockAccordionDetails);
    Object.defineProperty(accordionDetailsElement.parentElement, "scrollHeight", {
      configurable: true,
      value: 500,
    });
    expect(accordionDetailsElement).toBeVisible();
    await userEvent.click(accordionSummaryElement); // expanded
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "true");
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "500px",
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await userEvent.click(accordionSummaryElement); // collapsed
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "0px",
    });
  });

  it("should set height of accordion detials when expanded with disabled transition", async () => {
    const mockProps = {
      "data-testId": "accordion-details-test-id",
    };
    renderAccordionDetailsComponent(mockProps, { disableTransition: true });
    const accordionSummaryElement = screen.getByRole("button", {
      name: mockAccordionSummary,
    });
    expect(accordionSummaryElement).toBeVisible();
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");    
    const accordionDetailsElement = screen.getByText(mockAccordionDetails);
    Object.defineProperty(accordionDetailsElement.parentElement, "scrollHeight", {
      configurable: true,
      value: 500,
    });
    expect(accordionDetailsElement).toBeVisible();
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "true");
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "auto",
    });
    await userEvent.click(accordionSummaryElement);
    expect(accordionSummaryElement).toHaveAttribute("aria-expanded", "false");
    expect(accordionDetailsElement.parentElement).toHaveStyle({
      height: "0px",
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const mockProps = {
      "data-testId": "accordion-details-test-id",
    };
    const theme = createTheme({
      typography: {
        colors: {
          textPrimary: customClass,
        },
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Accordion>
          <AccordionSummary>
            {mockAccordionSummary}
          </AccordionSummary>
          <AccordionDetails
            {...mockProps}
          >
            {mockAccordionDetails}
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
    ));
    const accordionDetailsElement = screen.getByTestId(mockProps["data-testId"]);
    expect(accordionDetailsElement).toBeVisible();
    expect(accordionDetailsElement).toHaveClass(customClass);
  });
});