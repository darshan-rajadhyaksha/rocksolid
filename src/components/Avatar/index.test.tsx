import type { JSXElement, ValidComponent } from "solid-js";
import { fireEvent, render, screen, waitFor, within } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import Avatar, { type AvatarProps } from "./Avatar";
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

const rounded = [
  "none",
  "small",
  "medium",
  "large",
  "full",
] as const;

const sizes = [
  "small",
  "medium",
  "large",
] as const;

const renderAvatarComponent = <T extends ValidComponent>(
  props?: AvatarProps<T>,
  children?: JSXElement,
) => {
  return render(() => (
    <Avatar {...props}>
      {children}
    </Avatar>
  ));
};

describe("Avatar component", () => {
  it("should render the avatar", () => {
    const mockProps = {
      "data-testId": "avatar-test-id",
    };
    renderAvatarComponent(mockProps);
    const avatarElement = screen.getByTestId(mockProps["data-testId"]);
    expect(avatarElement).toBeVisible();
  });

  /** src and alt props */
  it("should render the alt when failed to load the image", async () => {
    const mockProps = {
      "data-testId": "avatar-test-id",
      src: "https://example.com/avatar.jpg",
      alt: "John Doe",
    };
    renderAvatarComponent(mockProps);
    const avatarElement = screen.getByTestId(mockProps["data-testId"]);
    expect(avatarElement).toBeVisible();
    let imageElement = within(avatarElement).getByRole("img");
    expect(imageElement).toBeVisible();
    expect(imageElement).toHaveAttribute("src", mockProps.src);
    expect(imageElement).toHaveAttribute("alt", "JD"); // Initials of "John Doe"
    fireEvent.error(imageElement);
    await waitFor(() => {
      const imageElement = within(avatarElement).queryByRole("img");
      expect(imageElement).toBeNull();
      expect(avatarElement).toHaveTextContent("JD"); // Initials of "John Doe"
    });
  });

  /** as prop */
  it("should render the avatar component with 'p' element", () => {
    const mockProps = {
      "data-testId": "avatar-test-id",
      as: "p",
    };
    renderAvatarComponent(mockProps);
    const avatarElement = screen.getByTestId(mockProps["data-testId"]);
    expect(avatarElement).toBeVisible();
    expect(avatarElement.tagName.toLowerCase()).toBe(mockProps.as);
  });

  /** class prop */
  it("should apply custom class to avatar element", () => {
    const mockProps = {
      "data-testId": "avatar-test-id",
      class: "test-class",
    };
    renderAvatarComponent(mockProps);
    const avatarElement = screen.getByTestId(mockProps["data-testId"]);
    expect(avatarElement).toBeVisible();
    expect(avatarElement).toHaveClass(mockProps.class);
  });

  /** color prop */
  colors.forEach((color) => {
    it(`should render avatar with color=${color}`, () => {
      const mockProps = {
        "data-testId": "avatar-test-id",
        color,
      };
      renderAvatarComponent(mockProps);
      const avatarElement = screen.getByTestId(mockProps["data-testId"]);
      expect(avatarElement).toBeVisible();
      expect(avatarElement).toHaveClass(
        theme.colors[color].solid.background,
        theme.colors[color].solid.text,
      );
    });
  });

  /** rounded prop */
  rounded.forEach((rounded) => {
    it(`should render avatar with rounded=${rounded}`, () => {
      const mockProps = {
        "data-testId": "avatar-test-id",
        rounded,
      };
      renderAvatarComponent(mockProps);
      const avatarElement = screen.getByTestId(mockProps["data-testId"]);
      expect(avatarElement).toBeVisible();
      expect(avatarElement).toHaveClass(
        theme.rounded[rounded],
      );
    });
  });

  /** size prop */
  sizes.forEach((size) => {
    it(`should render avatar with size=${size}`, () => {
      const mockProps = {
        "data-testId": "avatar-test-id",
        size,
      };
      renderAvatarComponent(mockProps);
      const avatarElement = screen.getByTestId(mockProps["data-testId"]);
      expect(avatarElement).toBeVisible();
      switch(size) {
        case "small":
          expect(avatarElement).toHaveClass(
            "size-6",
            "text-sm",
          );
          break;
        case "medium":
          expect(avatarElement).toHaveClass(
            "size-8",
            "text-sm",
          );
          break;
        case "large":
          expect(avatarElement).toHaveClass(
            "size-10",
            "text-md",
          );
          break;
      }
    });
  });

  /** slotProps prop */
  it("should apply props to slots", () => {
    const mockProps = {
      "data-testId": "avatar-test-id",
      src: "https://example.com/avatar.jpg",
      alt: "John Doe",
      slotProps: {
        img: { "loading": "lazy", class: "test-class-img", },
      },
    };
    renderAvatarComponent(mockProps);
    const avatarElement = screen.getByTestId(mockProps["data-testId"]);
    expect(avatarElement).toBeVisible();
    const imageElement = within(avatarElement).getByRole("img");
    expect(imageElement).toBeVisible();
    expect(imageElement).toHaveAttribute("loading", mockProps.slotProps.img.loading);
    expect(imageElement).toHaveClass(mockProps.slotProps.img.class);
  });

  /** theme overrides */
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "bg-zinc-500";
    const mockProps = {
      "data-testId": "avatar-test-id",
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
        <Avatar {...mockProps} />
      </ThemeProvider>
    ));
    const avatarElement = screen.getByTestId(mockProps["data-testId"]);
    expect(avatarElement).toBeVisible();
    expect(avatarElement).toHaveClass(customClass);
  });
});