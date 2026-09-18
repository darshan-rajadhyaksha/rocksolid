import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Link, { type LinkProps } from "@/components/Link";
import ThemeProvider from "@/components/ThemeProvider";
import { createTheme } from "@/components/styles";
import theme from "@/components/styles/theme";

const colors = [
  "inherit",
  "default",
  "success",
  "warning",
  "info",
  "error",
  "textPrimary",
  "textSecondary",
  "textTertiary",
  "disabled",
] as const;

const renderLinkComponent = (
  props?: LinkProps,
) => {
  return render(() => (
    <Link {...props}>
      Home
    </Link>
  ));
};

describe("Link component", () => {
  it("should render the link", () => {
    const mockProps = {
      href: "#",
    };
    renderLinkComponent(mockProps);
    const linkElement = screen.getByRole("link", { name: "Home" });
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveAttribute("href", mockProps.href);
    expect(linkElement).toHaveClass(
      "block",
      theme.rounded.small,
      theme.focus,
    );
  });

  /** class prop */
  it("should apply custom class to link element", () => {
    const mockProps = {
      class: "test-class",
      href: "#",
    };
    renderLinkComponent(mockProps);
    const linkElement = screen.getByRole("link", { name: "Home" });
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveClass(mockProps.class);
  });

    /** color prop */
  colors.forEach((color) => {
    it(`should render link with color=${color}`, () => {
      const mockProps = {
        color,
        href: "#",
      };
      renderLinkComponent(mockProps);
      const linkElement = screen.getByRole("link", { name: "Home" });
      expect(linkElement).toBeVisible();
      switch(color) {
        case "default":
        case "success":
        case "warning":
        case "info":
        case "error":
          expect(linkElement).toHaveClass(
            theme.colors[color].ghost.text,
          );
          break;   
        case "textPrimary":
        case "textSecondary":
        case "textTertiary":
          expect(linkElement).toHaveClass(
            theme.typography.colors[color],
          );
          break;
        case "disabled":
          expect(linkElement).toHaveClass(
            theme.disabled.text,
          );
          break;
        case "inherit":
          expect(linkElement).toHaveClass(
            "text-inherit",
            "dark:text-inherit",
          );
          break;
      }
    });
  });

  /** truncate prop */
  it("should apply truncation styles to link", () => {
    const mockProps = {
      href: "#",
      truncate: true,
    };
    renderLinkComponent(mockProps);
    const linkElement = screen.getByRole("link", { name: "Home" });
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveClass("truncate");
  });

  /** underline prop */
  ([
    "always",
    "hover",
    "none",
  ] as const).forEach((underline) => {
    it(`should apply styles for underline=${underline}`, () => {
      const mockProps = {
        href: "#",
        underline,
      };
      renderLinkComponent(mockProps);
      const linkElement = screen.getByRole("link", { name: "Home" });
      expect(linkElement).toBeVisible();
      const underlineClassMap = {
        none: "no-underline",
        hover: "hover:underline",
        always: "underline",
      };
      expect(linkElement).toHaveClass(underlineClassMap[underline]);
    });
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "text-zinc-500";
    const theme = createTheme({
      colors: {
        default: {
          ghost: {
            text: customClass,
          },
        },
      },
    });
    const mockProps = {
      href: "#",
    };
    render(() => (
      <ThemeProvider theme={theme}>
        <Link {...mockProps}>
          Home
        </Link>
      </ThemeProvider>
    ));
    const linkElement = screen.getByRole("link", { name: "Home" });
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveClass(customClass);
  });
});