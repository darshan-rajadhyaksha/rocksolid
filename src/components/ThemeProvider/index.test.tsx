import { describe, it, expect } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import { createTheme, useTheme } from "@/components/styles";
import Typography from "@/components/Typography";
import ThemeProvider from "./ThemeProvider";

const Component = () => {
  const theme = useTheme();
  return (
    <Typography
      // @ts-ignore
      class={theme.typography.variants.caption}
    >
      Hello World
    </Typography>
  )
};

describe("ThemeProvider component", () => {
  it("should apply styles overrides if wrapped inside ThemeProvider", () => {
    const customClass = "font-semibold";
    const theme = createTheme({
      typography: {
        variants: {
          body2: customClass,
        }
      },
    });
    render(() => (
      <ThemeProvider theme={theme}>
        <Typography>
          Hello World
        </Typography>
      </ThemeProvider>
    ));
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
    expect(typographyElement).toHaveClass(customClass);
  });

  it("should able to access theme using useTheme hook", () => {
    const captionVariantClass = "text-10xl";
    const theme = createTheme({
      typography: {
        variants: {
          caption: captionVariantClass,
        },
      },
    });
    render(() => {
      return (
        <ThemeProvider theme={theme}>
          <Component />
        </ThemeProvider>
      )
    });
    const typographyElement = screen.getByText("Hello World");
    expect(typographyElement).toBeVisible();
    expect(typographyElement).toHaveClass(captionVariantClass);
  });
});