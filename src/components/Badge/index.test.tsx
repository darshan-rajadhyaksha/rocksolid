import { render, screen, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Avatar from "@/components/Avatar";
import Badge, { type BadgeProps } from "@/components/Badge";
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

const overlaps = [
  "circle",
  "rect",
] as const;

const positionsX = [
  "left",
  "right",
] as const;

const positionsY = [
  "top",
  "bottom",
] as const;

const renderBadgeComponent = (
  props?: BadgeProps
) => {
  return render(() => (
    <Badge {...props}>
      <Avatar>JD</Avatar>
    </Badge>
  ));
};

describe("Badge component", () => {
  it("should render the badge", () => {
    const mockProps = {
      "data-testId": "badge-test-id",
      slotProps: {
        badge: { "data-testId": "bagde-slot-id" },
      },
    };
    renderBadgeComponent(mockProps);
    const badgeElement = screen.getByTestId(mockProps["data-testId"]);
    expect(badgeElement).toBeVisible();
    expect(badgeElement).toHaveClass("relative");
    const badgeSlotElement = within(
      badgeElement
    ).getByTestId(mockProps.slotProps.badge["data-testId"]);
    expect(badgeSlotElement).toBeVisible();
    expect(badgeSlotElement).toHaveClass(
      "absolute",
      "grid",
      "place-items-center",
      "text-xs",
      "font-semibold",
      theme.rounded.full,
    );
  });

  /** badgeContent prop */
  [
    1,
    "a"
  ].map((content) => {
    it(`should display badge with content=${content}`, () => {
      const mockProps = {
        "data-testId": "badge-test-id",
        badgeContent: content,
      };
      renderBadgeComponent(mockProps);
      const badgeElement = screen.getByTestId(mockProps["data-testId"]);
      expect(badgeElement).toBeVisible();
      expect(badgeElement).toHaveTextContent(`${content}`);
    });
  });

  /** class prop */
  it("should apply custom class to badge element", () => {
    const mockProps = {
      "data-testId": "badge-test-id",
      class: "test-class",
    };
    renderBadgeComponent(mockProps);
    const badgeElement = screen.getByTestId(mockProps["data-testId"]);
    expect(badgeElement).toBeVisible();
    expect(badgeElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render badge with color=${color}`, () => {
      const slotProps = {
        badge: { "data-testId": "bagde-slot-id" },
      };
      const mockProps = {
        "data-testId": "badge-test-id",
        color,
        slotProps,
      };
      renderBadgeComponent(mockProps);
      const badgeElement = screen.getByTestId(mockProps["data-testId"]);
      expect(badgeElement).toBeVisible();
      const badgeSlotElement = within(
        badgeElement
      ).getByTestId(slotProps.badge["data-testId"]);
      expect(badgeSlotElement).toHaveClass(
        theme.colors[color].solid.background,
        theme.colors[color].solid.text,
      );
    });
  });

  /** overlap & position prop */
  overlaps.forEach((overlap) => {
    positionsX.forEach((positionX) => {
      positionsY.forEach((positionY) => {
        it("should apply badge classes for " + 
           `overlap=${overlap}, position={ x: ${positionX}, y: ${positionY}}`, () => {
          const slotProps = {
            badge: { "data-testId": "bagde-slot-id" },
          }
          const mockProps = {
            "data-testId": "badge-test-id",
            overlap,
            position: {
              x: positionX,
              y: positionY,
            },
            slotProps,
          };
          renderBadgeComponent(mockProps);
          const badgeElement = screen.getByTestId(mockProps["data-testId"]);
          expect(badgeElement).toBeVisible();
          const badgeSlotElement = within(
            badgeElement
          ).getByTestId(slotProps.badge["data-testId"]);
          expect(badgeSlotElement).toBeVisible();

          /** overlap */
          const positionClassMap  = {
            top: "top-[15%]",
            bottom: "bottom-[15%]",
            left: "left-[15%]",
            right: "right-[15%]",
          };
          if (overlap === "circle") {
            expect(badgeSlotElement).toHaveClass(
              positionClassMap[positionX],
              positionClassMap[positionY],
            );
          } else {
            expect(badgeSlotElement).not.toHaveClass(
              positionClassMap[positionX],
              positionClassMap[positionY],
            );
          }

          /** overlap and position */
          const positionMap = {
            top: [
              overlap === "circle" ? positionClassMap.top : "top-0",
              "-translate-y-1/2",
            ],
            bottom: [
              overlap === "circle" ? positionClassMap.bottom : "bottom-0",
              "translate-y-1/2",
            ],
            left: [
              overlap === "circle" ? positionClassMap.left : "left-0",
              "-translate-x-1/2",
            ],
            right: [
              overlap === "circle" ? positionClassMap.right : "right-0",
              "translate-x-1/2",
            ],
          };
          expect(badgeSlotElement).toHaveClass(
            ...positionMap[positionX],
            ...positionMap[positionY],
          );
        });
      });
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const slotProps = {
      badge: { "data-testId": "bagde-slot-id", class: "test-class-badge", },
    };
    const mockProps = {
      "data-testId": "badge-test-id",
      slotProps,
    };
    renderBadgeComponent(mockProps);
    const badgeElement = screen.getByTestId(mockProps["data-testId"]);
    expect(badgeElement).toBeVisible();
    const badgeSlotElement = within(
      badgeElement
    ).getByTestId(slotProps.badge["data-testId"]);
    expect(badgeSlotElement).toBeVisible();
    expect(badgeSlotElement).toHaveClass(slotProps.badge.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
    const slotProps = {
      badge: { "data-testId": "bagde-slot-id" },
    };
    const mockProps = {
      "data-testId": "badge-test-id",
      slotProps,
    };
    const theme = createTheme({
      colors: {
        default: {
          solid: {
            background: customClass,
          }
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Badge {...mockProps}>
          <Avatar />
        </Badge>
      </ThemeProvider>
    ));
    const badgeElement = screen.getByTestId(mockProps["data-testId"]);
    expect(badgeElement).toBeVisible();
    const badgeSlotElement = within(
      badgeElement
    ).getByTestId(slotProps.badge["data-testId"]);
    expect(badgeSlotElement).toBeVisible();
    expect(badgeSlotElement).toHaveClass(customClass);
  });
});
