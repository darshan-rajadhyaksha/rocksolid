import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Skeleton, { type SkeletonProps } from "@/components/Skeleton";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";
import { type WithExtendedComponentProps } from "@/components/types/ExtendedComponentProps";

const renderSkeletonComponent = (
  props?: SkeletonProps & WithExtendedComponentProps,
) => {
  return render(() => (
    <Skeleton {...props} />
  ));
};

describe("Skeleton component", () => {
  it("should render the skeleton", () => {
    const mockProps = {
      "data-testId": "skeleton-test-id",
    };
    renderSkeletonComponent(mockProps);
    const skeletonElement = screen.getByTestId(mockProps["data-testId"]);
    expect(skeletonElement).toBeVisible();
    expect(skeletonElement).toHaveClass(
      "bg-neutral-200",
      "dark:bg-neutral-800",
      "shrink-0",
      "animate-[fade_2.5s_ease-in-out_infinite]",
    );
  });

  /** class prop */
  it("should apply custom class to skeleton element", () => {
    const mockProps = {
      "data-testId": "skeleton-test-id",
      class: "test-class",
    };
    renderSkeletonComponent(mockProps);
    const skeletonElement = screen.getByTestId(mockProps["data-testId"]);
    expect(skeletonElement).toBeVisible();
    expect(skeletonElement).toHaveClass(mockProps.class);
  });

  /** variant prop */
  ([
    "circle",
    "rectangle",
  ] as const).forEach((variant) => {
    it(`should dispaly skeleton with variant=${variant}`, () => {
      const mockProps = {
        "data-testId": "skeleton-test-id",
        variant,
      };
      renderSkeletonComponent(mockProps);
      const skeletonElement = screen.getByTestId(mockProps["data-testId"]);
      expect(skeletonElement).toBeVisible();
      switch(variant) {
        case "circle": 
          expect(skeletonElement).toHaveClass(
            "inline-block",
            "size-8",
            theme.rounded.full,
          );
          break;
        case "rectangle": 
          expect(skeletonElement).toHaveClass(
            "block",
            "w-full",
            "h-4",
            theme.rounded.small,
          );
          break;
      }
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "rounded-[2px]";
    const theme = createTheme({
      rounded: {
        small: customClass,
      }
    });
    const mockProps = {
      "data-testId": "skeleton-test-id",
    };
    render(() => (
      <ThemeProvider theme={theme}>
        <Skeleton {...mockProps} />
      </ThemeProvider>
    ));
    const skeletonElement = screen.getByTestId(mockProps["data-testId"]);
    expect(skeletonElement).toBeVisible();
    expect(skeletonElement).toHaveClass(customClass);
  });
});