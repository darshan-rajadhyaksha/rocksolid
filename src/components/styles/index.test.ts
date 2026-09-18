import { describe, it, expect } from "vitest";
import { createTheme, useTheme } from ".";
import theme, { type Theme } from "./theme";

describe("styles hooks", () => {
  it("throws when useTheme used outside ThemeProvider", () => {
    expect(() => useTheme()).toThrow(
      "useTheme must be used inside ThemeProvider component"
    );
  });

  it("should create theme object with overriden properties", () => {
    const customClass = "bg-zinc-500";
    const customTheme = createTheme({
      colors: {
        default: {
          solid: {
            background: customClass,
          },
        },
      },
    });
    expect(customTheme.colors.default.solid.background).toBe(customClass);
    const clonedTheme: Theme = JSON.parse(JSON.stringify(theme));
    clonedTheme.colors.default.solid.background = customClass;
    expect(customTheme).toMatchObject(clonedTheme);
  });

  it("should throw error when new token failed schema validation", () => {
    expect(
      () => createTheme({
        colors: {
          primary: {
            solid: {
              background: "bg-zinc-500",
            },
          },
        },
      })
    ).toThrow();
  });
});