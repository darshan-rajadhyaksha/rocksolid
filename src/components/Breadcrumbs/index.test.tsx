import type { ValidComponent } from "solid-js";
import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Link from "@/components/Link";
import Typography from "@/components/Typography";
import Breadcrumbs, { type BreadcrumbsProps } from "@/components/Breadcrumbs";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const renderBreadcrumbsComponent = <T extends ValidComponent = "div">(
  props?: BreadcrumbsProps<T>,
) => {
  return render(() => (
    <Breadcrumbs {...props}>
      <Link color="inherit" href="/">Home</Link>
      <Link color="inherit" href="/products">Products</Link>
      <Typography as="span" color="textPrimary">Details</Typography>
    </Breadcrumbs>
  ));
};

describe("Breadcrumbs component", () => {
  it("should render the breadcrumbs", () => {
    renderBreadcrumbsComponent();
    const breadcrumbsElement = screen.getByRole("navigation");
    expect(breadcrumbsElement).toBeVisible();
    expect(breadcrumbsElement).toHaveClass(
      theme.typography.variants.body2,
      theme.typography.colors.textTertiary,
    );
    const breadcrumbsList = within(
      breadcrumbsElement
    ).getByRole("list");
    expect(breadcrumbsList).toBeVisible();
    expect(breadcrumbsList).toHaveClass(
      "flex",
      "items-center",
      "flex-wrap",
      "gap-2",
    );
    const breadcrumbsListItems = within(
      breadcrumbsList
    ).getAllByRole("listitem");
    expect(breadcrumbsListItems).toHaveLength(3);
    const breadcrumbsListItemsIncludingSeperators = within(
      breadcrumbsList
    ).getAllByRole("listitem", { hidden: true });
    expect(breadcrumbsListItemsIncludingSeperators).toHaveLength(5);
  });

  /** as prop */
  it("should render the breadcrumbs component with 'div' element", () => {
    const mockProps = {
      as: "div",
      role: "navigation",
    } as const;
    renderBreadcrumbsComponent<"div">(mockProps);
    const breadcrumbsElement = screen.getByRole("navigation");
    expect(breadcrumbsElement).toBeVisible();
    expect(breadcrumbsElement.tagName.toLowerCase()).toBe(mockProps.as);
  });

  /** class prop */
  it("should apply custom class to breadcrumbs element", () => {
    const mockProps = {
      "data-testId": "breadcrumbs-test-id",
      class: "test-class",
    };
    renderBreadcrumbsComponent(mockProps);
    const breadcrumbsElement = screen.getByRole("navigation");
    expect(breadcrumbsElement).toBeVisible();
    expect(breadcrumbsElement).toHaveClass(mockProps.class);
  });

  /** seperator prop */
  it("should display custom seperator", () => {
    const mockProps = {
      "data-testId": "breadcrumbs-test-id",
      seperator: "->",
    };
    renderBreadcrumbsComponent(mockProps);
    const breadcrumbsElement = screen.getByRole("navigation");
    expect(breadcrumbsElement).toBeVisible();
    const breadcrumbsList = within(
      breadcrumbsElement
    ).getByRole("list");
    expect(breadcrumbsList).toBeVisible();
    const breadcrumbsListItemsIncludingSeperators = within(
      breadcrumbsList
    ).getAllByRole("listitem", { hidden: true });
    expect(breadcrumbsListItemsIncludingSeperators).toHaveLength(5);
    expect(breadcrumbsListItemsIncludingSeperators[1]).toHaveTextContent(mockProps.seperator);
    expect(breadcrumbsListItemsIncludingSeperators[3]).toHaveTextContent(mockProps.seperator);
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      ol: { "data-testId": "breadcrumbns-ol-id", class: "test-class-ol", },
      li: { "data-testId": "breadcrumbns-li-id", class: "test-class-li", },
      seperator: { "data-testId": "breadcrumbns-seperator-id", class: "test-class-seperator", },
    };
    renderBreadcrumbsComponent({ slotProps });
    const breadcrumbsElement = screen.getByRole("navigation");
    expect(breadcrumbsElement).toBeVisible();
    const breadcrumbsList = within(
      breadcrumbsElement
    ).getByRole("list");
    expect(breadcrumbsList).toBeVisible();
    expect(breadcrumbsList).toHaveAttribute(
      "data-testId",
      slotProps.ol["data-testId"],
    );
    expect(breadcrumbsList).toHaveClass(slotProps.ol.class);
    const breadcrumbsListItems = within(
      breadcrumbsList
    ).getAllByRole("listitem");
    expect(breadcrumbsListItems).toHaveLength(3);
    breadcrumbsListItems.forEach((listItem) => {
      expect(listItem).toHaveAttribute(
        "data-testId",
        slotProps.li["data-testId"],
      );
      expect(listItem).toHaveClass(slotProps.li.class);
    });
    const breadcrumbsListItemsIncludingSeperators = within(
      breadcrumbsList
    ).getAllByRole("listitem", { hidden: true });
    expect(breadcrumbsListItemsIncludingSeperators).toHaveLength(5);
    breadcrumbsListItemsIncludingSeperators.forEach((listItem, index) => {
      if (index % 2 !== 0) {
        expect(listItem).toHaveAttribute(
          "data-testId",
          slotProps.seperator["data-testId"],
        );
        expect(listItem).not.toHaveClass(slotProps.li.class);
        expect(listItem).toHaveClass(slotProps.seperator.class);
      } 
    });
  });

  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      typography: {
        colors: {
          textTertiary: customClass,
        },
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Breadcrumbs>
          <Link color="inherit" href="/">Home</Link>
          <Link color="inherit" href="/products">Products</Link>
          <Typography as="span" color="textPrimary">Details</Typography>
        </Breadcrumbs>
      </ThemeProvider>
    ));
    const breadcrumbsElement = screen.getByRole("navigation");
    expect(breadcrumbsElement).toBeVisible();
    expect(breadcrumbsElement).toHaveClass(customClass);
  });
});
